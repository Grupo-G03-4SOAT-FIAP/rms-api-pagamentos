import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFilaPagamentoConfirmadoAdapter } from 'src/domain/pedido/interfaces/pag_confirmado.adapter';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IWebhookUseCase } from 'src/domain/pedido/interfaces/webhook.use_case.port';
import {
  NotificacaoMercadoPagoDTO,
  PedidoGatewayPagamentoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';
import { IFilaFalhaPagamentoAdapter } from 'src/domain/pedido/interfaces/falha_pag.adapter';

@Injectable()
export class WebhookUseCase implements IWebhookUseCase {
  constructor(
    private readonly logger: Logger,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IGatewayPagamentoService)
    private readonly gatewayPagamentoService: IGatewayPagamentoService,
    @Inject(IFilaPagamentoConfirmadoAdapter)
    private readonly filaPagamentoConfirmadoAdapter: IFilaPagamentoConfirmadoAdapter,
    @Inject(IFilaFalhaPagamentoAdapter)
    private readonly filaFalhaPagamentoAdapter: IFilaFalhaPagamentoAdapter,
  ) {}

  async consumirMensagem(
    id: string,
    topic: string,
    notificacao: NotificacaoMercadoPagoDTO,
  ): Promise<any> {
    this.logger.debug(`Processando request do Mercado Pago...`);
    await this.pedidoRepository.guardarMsgWebhook(
      id,
      topic,
      JSON.stringify(notificacao),
    );

    if (id && topic === 'merchant_order') {
      const pedidoGatewayPag =
        await this.gatewayPagamentoService.consultarPedido(id);
      const idInternoPedido = pedidoGatewayPag.external_reference;
      if (this.verificarPagamento(pedidoGatewayPag)) {
        this.logger.log(`O pedido ${idInternoPedido} foi pago`);
        this.filaPagamentoConfirmadoAdapter.publicarPagamentoConfirmado(
          idInternoPedido,
        );
      } else if (
        pedidoGatewayPag.status == 'expired' ||
        pedidoGatewayPag.order_status == 'expired' ||
        pedidoGatewayPag.cancelled
      ) {
        this.filaFalhaPagamentoAdapter.publicarFalhaPagamento(idInternoPedido);
      }
      this.logger.debug(`A request do Mercado Pago foi processada com sucesso`);
      return {
        mensagem: 'Request processada com sucesso',
      };
    }
  }

  private verificarPagamento(
    pedidoGatewayPag: PedidoGatewayPagamentoDTO,
  ): boolean {
    if (
      pedidoGatewayPag.status === 'closed' && // closed: Order with payments covering total amount.
      pedidoGatewayPag.order_status === 'paid' && // paid: Order with the sum of all payments "approved", "chargeback" or "in_mediation", covers the order total amount.
      pedidoGatewayPag.payments.every((payment) => {
        return payment.status === 'approved'; // approved: The payment has been approved and accredited.
      })
    ) {
      return true;
    }
    return false;
  }
}

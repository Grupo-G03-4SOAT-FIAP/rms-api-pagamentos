import { Inject, Injectable } from '@nestjs/common';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IWebhookUseCase } from 'src/domain/pedido/interfaces/webhook.use_case.port';
import { PedidoGatewayPagamentoDTO } from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';

@Injectable()
export class WebhookUseCase implements IWebhookUseCase {
  constructor(
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoFactory)
    private readonly pedidoFactory: IPedidoFactory,
    @Inject(IGatewayPagamentoService)
    private readonly gatewayPagamentoService: IGatewayPagamentoService,
    @Inject(IApiPedidosService)
    private readonly apiPedidosService: IApiPedidosService,
    @Inject(IPedidoDTOFactory)
    private readonly pedidoDTOFactory: IPedidoDTOFactory,
  ) {}

  async consumirMensagem(
    id: string,
    topic: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //mensagem: MensagemMercadoPagoDTO,
  ): Promise<any> {
    // TODO: Gravar no MongoDB os parâmentros id, topic e mensagem que recebemos do Mercado Pago, para auditoria
    await this.pedidoRepository.guardarMsgWebhook(id, topic);

    if (id && topic === 'merchant_order') {
      const pedidoGatewayPag =
        await this.gatewayPagamentoService.consultarPedido(id);
      const idInternoPedido = pedidoGatewayPag.external_reference;
      if (this.verificarPagamento(pedidoGatewayPag)) {
        this.apiPedidosService.atualizarStatusPedido(idInternoPedido);
      }
      return {
        mensagem: 'Mensagem consumida com sucesso',
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

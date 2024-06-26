import { Inject, Injectable, Logger } from '@nestjs/common';
import { HTTPResponse } from 'src/application/common/HTTPResponse';
import { IFilaCobrancaGeradaAdapter } from 'src/domain/pedido/interfaces/cobranca_gerada.port';
import { IFilaFalhaCobrancaAdapter } from 'src/domain/pedido/interfaces/falha_cobranca.port';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import {
  CriaPedidoDTO,
  PedidoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';

@Injectable()
export class PedidoUseCase implements IPedidoUseCase {
  constructor(
    private readonly logger: Logger,
    @Inject(IPedidoRepository)
    private readonly pedidoRepository: IPedidoRepository,
    @Inject(IPedidoFactory)
    private readonly pedidoFactory: IPedidoFactory,
    @Inject(IGatewayPagamentoService)
    private readonly gatewayPagamentoService: IGatewayPagamentoService,
    @Inject(IPedidoDTOFactory)
    private readonly pedidoDTOFactory: IPedidoDTOFactory,
    @Inject(IFilaCobrancaGeradaAdapter)
    private readonly filaCobrancaGeradaAdapter: IFilaCobrancaGeradaAdapter,
    @Inject(IFilaFalhaCobrancaAdapter)
    private readonly filaFalhaCobrancaAdapter: IFilaFalhaCobrancaAdapter,
  ) {}

  async criarPedido(
    criaPedidoDTO: CriaPedidoDTO,
  ): Promise<HTTPResponse<PedidoDTO>> {
    const pedido = await this.pedidoFactory.criarEntidadePedido(criaPedidoDTO);
    const pedidoDTO = this.pedidoDTOFactory.criarPedidoDTO(pedido);
    try {
      const qrData = await this.gatewayPagamentoService.criarPedido(pedido);
      this.logger.log(
        `QR Code gerado com sucesso para o pedido ${pedido?.id}`,
        qrData,
      );
      pedidoDTO.qrCode = qrData;
      await this.pedidoRepository.registrarQRCode(
        pedido.id,
        qrData,
        new Date(),
      );
      await this.filaCobrancaGeradaAdapter.publicarCobrancaGerada(pedidoDTO);
    } catch (error) {
      this.logger.error(
        `Não foi possível gerar o QR Code para o pedido ${pedido?.id}`,
        error,
      );
      await this.filaFalhaCobrancaAdapter.publicarFalhaCobranca(pedidoDTO);
      throw error;
    }
    return {
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTO,
    };
  }
}

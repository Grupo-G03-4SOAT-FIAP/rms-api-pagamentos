import { Inject, Injectable } from '@nestjs/common';
import { HTTPResponse } from 'src/application/common/HTTPResponse';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
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

  async criarPedido(
    criaPedidoDTO: CriaPedidoDTO,
  ): Promise<HTTPResponse<PedidoDTO>> {
    const pedido = await this.pedidoFactory.criarEntidadePedido(criaPedidoDTO);
    const pedidoDTO = this.pedidoDTOFactory.criarPedidoDTO(pedido);
    const qrData = await this.gatewayPagamentoService.criarPedido(pedido);
    pedidoDTO.qrCode = qrData;

    await this.pedidoRepository.registrarQRCode(pedido.id, qrData, new Date());

    return {
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTO,
    };
  }
}

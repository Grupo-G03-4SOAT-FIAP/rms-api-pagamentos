import { Test, TestingModule } from '@nestjs/testing';
import { PedidoUseCase } from './pedido.use_case';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import {
  apiPedidosServiceMock,
  criaPedidoDTOMock,
  filaCobrancaGeradaAdapterMock,
  gatewayPagamentoServiceMock,
  pedidoDTOFactoryMock,
  pedidoDTOMock,
  pedidoEntityMock,
  pedidoFactoryMock,
  pedidoModelMock,
  pedidoRepositoryMock,
} from 'src/mocks/pedido.mock';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedido.service.port';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { IFilaCobrancaGeradaAdapter } from 'src/domain/pedido/interfaces/cobranca_gerada.port';

describe('PedidoUseCase', () => {
  let pedidoUseCase: PedidoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        PedidoUseCase,
        ConfigService,
        {
          provide: IPedidoRepository,
          useValue: pedidoRepositoryMock,
        },
        {
          provide: IPedidoFactory,
          useValue: pedidoFactoryMock,
        },
        {
          provide: IGatewayPagamentoService,
          useValue: gatewayPagamentoServiceMock,
        },
        {
          provide: IApiPedidosService,
          useValue: apiPedidosServiceMock,
        },
        {
          provide: IPedidoDTOFactory,
          useValue: pedidoDTOFactoryMock,
        },
        {
          provide: IFilaCobrancaGeradaAdapter,
          useValue: filaCobrancaGeradaAdapterMock,
        },
      ],
    }).compile();

    pedidoUseCase = module.get<PedidoUseCase>(PedidoUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um pedido com sucesso', async () => {
    pedidoFactoryMock.criarEntidadePedido.mockReturnValue(pedidoEntityMock);
    pedidoRepositoryMock.criarPedido.mockReturnValue(pedidoModelMock);
    pedidoRepositoryMock.registrarQRCode(null);

    gatewayPagamentoServiceMock.criarPedido.mockReturnValue(null);
    pedidoDTOFactoryMock.criarPedidoDTO.mockReturnValue(pedidoDTOMock);

    const result = await pedidoUseCase.criarPedido(criaPedidoDTOMock);

    expect(pedidoFactoryMock.criarEntidadePedido).toHaveBeenCalledWith(
      criaPedidoDTOMock,
    );
    expect(pedidoDTOFactoryMock.criarPedidoDTO).toHaveBeenCalledWith(
      pedidoEntityMock,
    );
    expect(result).toStrictEqual({
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTOMock,
    });
  });
});

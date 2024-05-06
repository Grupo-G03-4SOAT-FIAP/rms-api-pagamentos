import { Test, TestingModule } from '@nestjs/testing';
import { PedidoUseCase } from './pedido.use_case';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import {
  apiPedidosServiceMock,
  criaPedidoDTOMock,
  gatewayPagamentoServiceMock,
  mensagemGatewayPagamentoDTO,
  pedidoDTOFactoryMock,
  pedidoDTOMock,
  pedidoEntityMock,
  pedidoFactoryMock,
  pedidoGatewayPagamentoDTO,
  pedidoModelMock,
  pedidoRepositoryMock,
} from 'src/mocks/pedido.mock';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import { ConfigService } from '@nestjs/config';

describe('PedidoUseCase', () => {
  let pedidoUseCase: PedidoUseCase;
  let pedidoId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      ],
    }).compile();

    pedidoUseCase = module.get<PedidoUseCase>(PedidoUseCase);
    pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';
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

  it('deve atualizar o status de pagamento do pedido com sucesso', async () => {
    const idPedidoMercadoPago = '15171882961';
    const topicMercadoPago = 'merchant_order';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(pedidoModelMock);
    pedidoRepositoryMock.editarStatusPedido.mockReturnValue(pedidoModelMock);
    pedidoRepositoryMock.guardarMsgWebhook.mockReturnValue(null);

    pedidoDTOFactoryMock.criarPedidoDTO.mockReturnValue(pedidoDTOMock);
    gatewayPagamentoServiceMock.consultarPedido.mockReturnValue(
      pedidoGatewayPagamentoDTO,
    );

    const result = await pedidoUseCase.consumirMensagem(
      idPedidoMercadoPago,
      topicMercadoPago,
      mensagemGatewayPagamentoDTO,
    );

    expect(apiPedidosServiceMock.atualizarStatusPedido).toHaveBeenCalledWith(
      pedidoId,
    );
    expect(result).toStrictEqual({
      mensagem: 'Mensagem consumida com sucesso',
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import {
  criaPedidoDTOMock,
  pedidoDTOMock,
  pedidoUseCaseMock,
} from 'src/mocks/pedido.mock';

const webhookUseCaseMockFactory = () => ({
  consumirMensagem: jest.fn(),
});

describe('PedidoController', () => {
  let pedidoController: PedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoController,
        {
          provide: IPedidoUseCase,
          useValue: pedidoUseCaseMock,
        },
      ],
    }).compile();

    pedidoController = module.get<PedidoController>(PedidoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve fazer checkout de pedido', async () => {
    const HTTPResponse = {
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTOMock,
    };

    pedidoUseCaseMock.criarPedido.mockReturnValue(HTTPResponse);

    const result = await pedidoController.criarPedido(criaPedidoDTOMock);

    expect(pedidoUseCaseMock.criarPedido).toHaveBeenCalledWith(
      criaPedidoDTOMock,
    );
    expect(result).toStrictEqual(HTTPResponse);
  });
});

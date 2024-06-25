import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  criaPedidoDTOMock,
  pedidoDTOMock,
  pedidoUseCaseMock,
} from 'src/mocks/pedido.mock';
import { CobrancaMessageHandler } from './cobranca.message_handler';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import { messageMock } from 'src/mocks/message.mock';
import { Logger } from '@nestjs/common';

describe('CobrancaMessageHandler', () => {
  let cobrancaMessageHandler: CobrancaMessageHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        CobrancaMessageHandler,
        {
          provide: IPedidoUseCase,
          useValue: pedidoUseCaseMock,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    cobrancaMessageHandler = module.get<CobrancaMessageHandler>(
      CobrancaMessageHandler,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve consumir mensagem nova cobrança', async () => {
    const HTTPResponse = {
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTOMock,
    };

    pedidoUseCaseMock.criarPedido.mockReturnValue(HTTPResponse);

    await cobrancaMessageHandler.handleMessage(messageMock);

    expect(pedidoUseCaseMock.criarPedido).toHaveBeenCalledWith(
      criaPedidoDTOMock,
    );
  });

  it('deve lançar exceção ao consumir mensagem nova cobrança', async () => {
    pedidoUseCaseMock.criarPedido.mockRejectedValue(new Error('Erro'));

    await cobrancaMessageHandler.handleMessage(messageMock);

    expect(pedidoUseCaseMock.criarPedido).toHaveBeenCalledWith(
      criaPedidoDTOMock,
    );
  });
});

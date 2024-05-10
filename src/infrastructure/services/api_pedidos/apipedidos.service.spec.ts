import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiPedidosService } from './apipedidos.service';
import { pedidoResponseMock } from 'src/mocks/pedido.mock';

describe('ApiPedidosService', () => {
  let apiPedidosService: ApiPedidosService;
  let configService: ConfigService;
  let pedidoId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiPedidosService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    apiPedidosService = module.get<ApiPedidosService>(ApiPedidosService);
    configService = module.get<ConfigService>(ConfigService);
    pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve atualizar status de um pedido', async () => {
    jest.spyOn(configService, 'get').mockReturnValue('http://localhost:3000');

    jest.spyOn(axios, 'put').mockResolvedValue({
      data: {
        body: pedidoResponseMock,
      },
    });

    expect(
      apiPedidosService.atualizarStatusPedido(pedidoId),
    ).resolves.not.toThrow();
  });

  it('deve lançar uma exceção ao atualizar status de um pedido', async () => {
    jest.spyOn(configService, 'get').mockReturnValue('http://localhost:3000');

    jest.spyOn(axios, 'put').mockRejectedValue(new Error('Erro'));

    await expect(
      apiPedidosService.atualizarStatusPedido(pedidoId),
    ).rejects.toThrow('Ocorreu um erro ao atualizar o status do pedido.');
  });
});

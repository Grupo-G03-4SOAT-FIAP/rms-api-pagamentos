import { Test, TestingModule } from '@nestjs/testing';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import {
  filaFalhaPagamentoAdapterMock,
  filaPagamentoConfirmadoAdapterMock,
  gatewayPagamentoServiceMock,
  pedidoCanceladoGatewayPagamentoDTO,
  pedidoDTOFactoryMock,
  pedidoDTOMock,
  pedidoFactoryMock,
  pedidoGatewayPagamentoDTO,
  pedidoModelMock,
  pedidoRepositoryMock,
} from 'src/mocks/pedido.mock';
import { ConfigService } from '@nestjs/config';
import { WebhookUseCase } from './webhook.use_case';
import { Logger } from '@nestjs/common';
import { IFilaPagamentoConfirmadoAdapter } from 'src/domain/pedido/interfaces/pag_confirmado.adapter';
import { IFilaFalhaPagamentoAdapter } from 'src/domain/pedido/interfaces/falha_pag.adapter';

describe('WebhookUseCase', () => {
  let webhookUseCase: WebhookUseCase;
  let pedidoId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        WebhookUseCase,
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
          provide: IFilaPagamentoConfirmadoAdapter,
          useValue: filaPagamentoConfirmadoAdapterMock,
        },
        {
          provide: IFilaFalhaPagamentoAdapter,
          useValue: filaFalhaPagamentoAdapterMock,
        },
        {
          provide: IPedidoDTOFactory,
          useValue: pedidoDTOFactoryMock,
        },
      ],
    }).compile();

    webhookUseCase = module.get<WebhookUseCase>(WebhookUseCase);
    pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve publicar mensagem de pagamento confirmado', async () => {
    const idPedidoMercadoPago = '15171882961';
    const topicMercadoPago = 'merchant_order';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(pedidoModelMock);
    pedidoRepositoryMock.editarStatusPedido.mockReturnValue(pedidoModelMock);
    pedidoDTOFactoryMock.criarPedidoDTO.mockReturnValue(pedidoDTOMock);
    gatewayPagamentoServiceMock.consultarPedido.mockReturnValue(
      pedidoGatewayPagamentoDTO,
    );

    const result = await webhookUseCase.consumirMensagem(
      idPedidoMercadoPago,
      topicMercadoPago,
      null,
    );

    expect(
      filaPagamentoConfirmadoAdapterMock.publicarPagamentoConfirmado,
    ).toHaveBeenCalledWith(pedidoId);
    expect(result).toStrictEqual({
      mensagem: 'Request processada com sucesso',
    });
  });

  it('deve publicar mensagem de falha no pagamento', async () => {
    const idPedidoMercadoPago = '15171882961';
    const topicMercadoPago = 'merchant_order';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(pedidoModelMock);
    pedidoRepositoryMock.editarStatusPedido.mockReturnValue(pedidoModelMock);
    pedidoDTOFactoryMock.criarPedidoDTO.mockReturnValue(pedidoDTOMock);
    gatewayPagamentoServiceMock.consultarPedido.mockReturnValue(
      pedidoCanceladoGatewayPagamentoDTO,
    );

    const result = await webhookUseCase.consumirMensagem(
      idPedidoMercadoPago,
      topicMercadoPago,
      null,
    );

    expect(
      filaFalhaPagamentoAdapterMock.publicarFalhaPagamento,
    ).toHaveBeenCalledWith(pedidoId);
    expect(result).toStrictEqual({
      mensagem: 'Request processada com sucesso',
    });
  });
});

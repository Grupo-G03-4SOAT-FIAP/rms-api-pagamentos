import { Test, TestingModule } from '@nestjs/testing';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import { pedidoUseCaseMock } from 'src/mocks/pedido.mock';
import { WebhookController } from './webhook.controller';

describe('WebhookController', () => {
  let webhookController: WebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookController,
        {
          provide: IPedidoUseCase,
          useValue: pedidoUseCaseMock,
        },
      ],
    }).compile();

    webhookController = module.get<WebhookController>(WebhookController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('deve consumir mensagem do Mercado Pago', async () => {
    throw new Error('Method not implemented.');
  });
});

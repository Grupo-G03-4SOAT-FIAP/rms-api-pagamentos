import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { IWebhookUseCase } from 'src/domain/pedido/interfaces/webhook.use_case.port';
import { Logger, NotFoundException } from '@nestjs/common';

describe('WebhookController', () => {
  let controller: WebhookController;
  let webhookUseCaseMock: jest.Mocked<IWebhookUseCase>;

  beforeEach(async () => {
    const webhookUseCaseMockFactory = () => ({
      consumirMensagem: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        Logger,
        {
          provide: IWebhookUseCase,
          useFactory: webhookUseCaseMockFactory,
        },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    webhookUseCaseMock = module.get<IWebhookUseCase>(
      IWebhookUseCase,
    ) as jest.Mocked<IWebhookUseCase>;
  });

  it('deve consumir uma mensagem', async () => {
    const id = '123';
    const topic = 'pedido';
    const mensagemEsperada = {};

    webhookUseCaseMock.consumirMensagem.mockResolvedValue(mensagemEsperada);

    const result = await controller.consumirMensagem(id, topic, null);

    expect(webhookUseCaseMock.consumirMensagem).toHaveBeenCalledWith(id, topic);

    expect(result).toEqual(mensagemEsperada);
  });

  it('deve lançar uma NotFoundException se o use case lançar uma NotFoundException', async () => {
    const id = '123';
    const topic = 'pedido';

    webhookUseCaseMock.consumirMensagem.mockRejectedValue(
      new NotFoundException('Pedido não encontrado'),
    );

    await expect(controller.consumirMensagem(id, topic, null)).rejects.toThrow(
      NotFoundException,
    );
  });
});

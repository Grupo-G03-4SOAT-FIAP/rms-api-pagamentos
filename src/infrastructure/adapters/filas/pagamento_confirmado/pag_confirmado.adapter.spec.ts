import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FilaPagamentoConfirmadoAdapter } from './pag_confirmado.adapter';
import { pedidoDTOMock } from 'src/mocks/pedido.mock';
import { SqsService } from '@ssut/nestjs-sqs';
import { Logger } from '@nestjs/common';

describe('FilaPagamentoConfirmadoAdapter', () => {
  let filaPagamentoConfirmadoAdapter: FilaPagamentoConfirmadoAdapter;
  let configService: ConfigService;
  let sqsService: SqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        FilaPagamentoConfirmadoAdapter,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
            getOrThrow: jest.fn(),
          },
        },
        {
          provide: SqsService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    filaPagamentoConfirmadoAdapter = module.get<FilaPagamentoConfirmadoAdapter>(
      FilaPagamentoConfirmadoAdapter,
    );
    configService = module.get<ConfigService>(ConfigService);
    sqsService = module.get<SqsService>(SqsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve publicar falha na cobrança', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('falha-cobranca');
    jest.spyOn(sqsService, 'send');

    await filaPagamentoConfirmadoAdapter.publicarPagamentoConfirmado(
      pedidoDTOMock.id,
    );
    expect(sqsService.send).toHaveBeenCalled();
  });

  it('deve lançar exceção ao publicar falha na cobrança', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('falha-cobranca');
    jest.spyOn(sqsService, 'send').mockRejectedValue(new Error('Erro'));

    await expect(
      filaPagamentoConfirmadoAdapter.publicarPagamentoConfirmado(
        pedidoDTOMock.id,
      ),
    ).rejects.toThrow('Ocorreu um erro ao publicar a mensagem.');
  });
});

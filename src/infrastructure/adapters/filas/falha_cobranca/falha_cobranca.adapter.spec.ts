import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FilaFalhaCobrancaAdapter } from './falha_cobranca.adapter';
import { pedidoDTOMock } from 'src/mocks/pedido.mock';
import { SqsService } from '@ssut/nestjs-sqs';
import { Logger } from '@nestjs/common';

describe('FilaFalhaCobrancaAdapter', () => {
  let filaFalhaCobrancaAdapter: FilaFalhaCobrancaAdapter;
  let configService: ConfigService;
  let sqsService: SqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        FilaFalhaCobrancaAdapter,
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

    filaFalhaCobrancaAdapter = module.get<FilaFalhaCobrancaAdapter>(
      FilaFalhaCobrancaAdapter,
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

    await filaFalhaCobrancaAdapter.publicarFalhaCobranca(pedidoDTOMock);
    expect(sqsService.send).toHaveBeenCalled();
  });

  it('deve lançar exceção ao publicar falha na cobrança', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('falha-cobranca');
    jest.spyOn(sqsService, 'send').mockRejectedValue(new Error('Erro'));

    await expect(
      filaFalhaCobrancaAdapter.publicarFalhaCobranca(null),
    ).rejects.toThrow('Ocorreu um erro ao publicar a mensagem.');
  });
});

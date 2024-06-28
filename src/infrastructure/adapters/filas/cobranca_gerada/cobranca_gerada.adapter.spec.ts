import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FilaCobrancaGeradaAdapter } from './cobranca_gerada.adapter';
import { pedidoDTOMock } from 'src/mocks/pedido.mock';
import { SqsService } from '@ssut/nestjs-sqs';
import { Logger } from '@nestjs/common';

describe('FilaCobrancaGeradaAdapter', () => {
  let filaCobrancaGeradaAdapter: FilaCobrancaGeradaAdapter;
  let configService: ConfigService;
  let sqsService: SqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        FilaCobrancaGeradaAdapter,
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

    filaCobrancaGeradaAdapter = module.get<FilaCobrancaGeradaAdapter>(
      FilaCobrancaGeradaAdapter,
    );
    configService = module.get<ConfigService>(ConfigService);
    sqsService = module.get<SqsService>(SqsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve publicar cobrança gerada', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('cobranca-gerada');
    jest.spyOn(sqsService, 'send');

    await filaCobrancaGeradaAdapter.publicarCobrancaGerada(pedidoDTOMock);
    expect(sqsService.send).toHaveBeenCalled();
  });

  it('deve lançar exceção ao publicar cobrança gerada', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('cobranca-gerada');
    jest.spyOn(sqsService, 'send').mockRejectedValue(new Error('Erro'));

    await expect(
      filaCobrancaGeradaAdapter.publicarCobrancaGerada(null),
    ).rejects.toThrow('Ocorreu um erro ao publicar a mensagem.');
  });
});

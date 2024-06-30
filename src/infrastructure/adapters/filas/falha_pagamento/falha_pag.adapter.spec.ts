import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FilaFalhaPagamentoAdapter } from './falha_pag.adapter';
import { pedidoDTOMock } from 'src/mocks/pedido.mock';
import { SqsService } from '@ssut/nestjs-sqs';
import { Logger } from '@nestjs/common';

describe('FilaFalhaPagamentoAdapter', () => {
  let filaFalhaPagamentoAdapter: FilaFalhaPagamentoAdapter;
  let configService: ConfigService;
  let sqsService: SqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Logger,
        FilaFalhaPagamentoAdapter,
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

    filaFalhaPagamentoAdapter = module.get<FilaFalhaPagamentoAdapter>(
      FilaFalhaPagamentoAdapter,
    );
    configService = module.get<ConfigService>(ConfigService);
    sqsService = module.get<SqsService>(SqsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve publicar falha no pagamento', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('falha-pagamento');
    jest.spyOn(sqsService, 'send');

    await filaFalhaPagamentoAdapter.publicarFalhaPagamento(pedidoDTOMock.id);
    expect(sqsService.send).toHaveBeenCalled();
  });

  it('deve lançar exceção ao publicar falha no pagamento', async () => {
    jest.spyOn(configService, 'getOrThrow').mockReturnValue('falha-pagamento');
    jest.spyOn(sqsService, 'send').mockRejectedValue(new Error('Erro'));

    await expect(
      filaFalhaPagamentoAdapter.publicarFalhaPagamento(pedidoDTOMock.id),
    ).rejects.toThrow('Ocorreu um erro ao publicar a mensagem.');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PedidoRepository } from './pedido.repository';
import { pedidoSQLDTOFactoryMock } from 'src/mocks/pedido.mock';
import { SQLDTOFactory } from '../../factories/sql.dto.factory';

describe('PedidoRepository', () => {
  let pedidoRepository: PedidoRepository;
  let pedidoId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoRepository,
        {
          provide: SQLDTOFactory,
          useValue: pedidoSQLDTOFactoryMock,
        },
      ],
    }).compile();

    pedidoRepository = module.get<PedidoRepository>(PedidoRepository);
    pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('deve salvar o QR Code do pedido', async () => {
    throw new Error('Method not implemented.');
  });

  it.skip('deve salvar a mensagem recebedida através do webhook', async () => {
    throw new Error('Method not implemented.');
  });
});

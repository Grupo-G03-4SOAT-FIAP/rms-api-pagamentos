import { Test, TestingModule } from '@nestjs/testing';
import { PedidoRepository } from './pedido.repository';
import { pedidoSQLDTOFactoryMock } from 'src/mocks/pedido.mock';
import { SQLDTOFactory } from '../../factories/sql.dto.factory';

describe('PedidoRepository', () => {
  let pedidoRepository: PedidoRepository;

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('deve salvar o QR Code do pedido', async () => {
    const dataServices = {
      pagamento: {
        create: jest
          .fn()
          .mockResolvedValue({ id: '1', qr_data: 'QR123', date: new Date() }),
      },
    };

    // Substitua o dataServices real pelo mock
    pedidoRepository['dataServices'] = dataServices as any;

    // Chame o método e verifique se ele retorna o registro criado
    const idPedido = 'pedido123';
    const qrData = 'QR123';
    const date = new Date();
    const registroCriado = await pedidoRepository.registrarQRCode(
      idPedido,
      qrData,
      date,
    );
    expect(registroCriado).toEqual({
      id: '1',
      qr_data: 'QR123',
      date: expect.any(Date),
    });

    // Verifique se o método create do dataServices foi chamado com os argumentos corretos
    expect(dataServices.pagamento.create).toHaveBeenCalledWith({
      id_pedido: idPedido,
      qr_data: qrData,
      date: date,
    });
  });

  it.skip('deve salvar a mensagem recebedida através do webhook', async () => {
    const dataServices = {
      retorno_mp: {
        create: jest.fn().mockResolvedValue({ id: '1', topic: 'webhook' }),
      },
    };

    // Substitua o dataServices real pelo mock
    pedidoRepository['dataServices'] = dataServices as any;

    // Chame o método e verifique se ele retorna a mensagem criada
    const id = '1';
    const topic = 'webhook';
    const mensagemCriada = await pedidoRepository.guardarMsgWebhook(id, topic);
    expect(mensagemCriada).toEqual({ id: '1', topic: 'webhook' });

    // Verifique se o método create do dataServices foi chamado com os argumentos corretos
    expect(dataServices.retorno_mp.create).toHaveBeenCalledWith({
      id,
      topic,
    });
  });
});

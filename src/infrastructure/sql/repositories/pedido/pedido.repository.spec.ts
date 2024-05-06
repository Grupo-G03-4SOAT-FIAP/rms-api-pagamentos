import { PedidoRepository } from './pedido.repository';

describe('PedidoRepository', () => {
  let pedidoRepository: PedidoRepository;
  let mockDataServices: any;

  beforeEach(() => {
    mockDataServices = {
      pagamento: {
        create: jest.fn(),
      },
      retorno_mp: {
        create: jest.fn(),
      },
    };
    pedidoRepository = new PedidoRepository(mockDataServices);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a payment record', async () => {
    const idPedido = '123';
    const qrData = 'qr_code_data';
    const date = new Date();

    const mockPagamento = { id_pedido: idPedido, qr_data: qrData, date: date };
    mockDataServices.pagamento.create.mockResolvedValue(mockPagamento);

    const result = await pedidoRepository.registrarQRCode(
      idPedido,
      qrData,
      date,
    );

    expect(mockDataServices.pagamento.create).toHaveBeenCalledWith(
      mockPagamento,
    );
    expect(result).toEqual(mockPagamento);
  });

  it('should create a webhook message', async () => {
    const id = '123';
    const topic = 'webhook_topic';

    const mockRetornoMP = { id: id, topic: topic };
    mockDataServices.retorno_mp.create.mockResolvedValue(mockRetornoMP);

    const result = await pedidoRepository.guardarMsgWebhook(id, topic);

    expect(mockDataServices.retorno_mp.create).toHaveBeenCalledWith({
      id,
      topic,
    });
    expect(result).toEqual(mockRetornoMP);
  });
});

import {
  ItemPedidoDTOMock,
  itemPedidoDTOMock,
  itemPedidoEntityMock,
  itemPedidoEntityNotIdMock,
  itemPedidoModelMock,
} from './item_pedido.mock';
import { PedidoModel } from 'src/infrastructure/sql/models/pedido.model';
import { PedidoEntity } from 'src/domain/pedido/entities/pedido.entity';
import { StatusPedido } from 'src/domain/pedido/enums/pedido.enum';
import {
  CriaPedidoDTO,
  PedidoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import {
  MensagemMercadoPagoDTO,
  PaymentDTO,
  PedidoGatewayPagamentoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';

// Mock para simular dados da tabela pedido no banco de dados
export const pedidoModelMock = new PedidoModel();
pedidoModelMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
pedidoModelMock.numeroPedido = '05012024';
pedidoModelMock.itensPedido = [itemPedidoModelMock];
pedidoModelMock.pago = false;
pedidoModelMock.statusPedido = 'recebido';
pedidoModelMock.criadoEm = '2024-01-25T00:05:04.941Z';
pedidoModelMock.atualizadoEm = '2024-01-25T00:05:04.941Z';

// Mock para simular dados da entidade pedido com todos os itens
export const pedidoEntityMock = new PedidoEntity(
  [itemPedidoEntityMock],
  StatusPedido.RECEBIDO,
  '05012024',
  false,
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular dados da entidade pedido sem data criação e atualização
export const pedidoEntityNotDateMock = new PedidoEntity(
  [itemPedidoEntityMock],
  StatusPedido.RECEBIDO,
  '05012024',
  false,
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular dados da entidade pedido sem id
export const pedidoEntityNotIdMock = new PedidoEntity(
  [itemPedidoEntityNotIdMock],
  StatusPedido.RECEBIDO,
  '05012024',
  false,
);

// Mock para simular dados da entidade pedido sem cliente
export const pedidoEntityNotClienteMock = new PedidoEntity(
  [itemPedidoEntityNotIdMock],
  StatusPedido.RECEBIDO,
  '05012024',
  false,
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular o DTO com os dados recebidos pelo usuario ao criar um pedido
export const criaPedidoDTOMock = new CriaPedidoDTO();
criaPedidoDTOMock.id = pedidoModelMock.id;
criaPedidoDTOMock.numeroPedido = pedidoModelMock.numeroPedido;
criaPedidoDTOMock.itensPedido = [ItemPedidoDTOMock];

// Mock para simular o DTO com dados de pedido enviados para o usuario ao responder uma requisição
export const pedidoDTOMock = new PedidoDTO();
pedidoDTOMock.id = pedidoModelMock.id;
pedidoDTOMock.numeroPedido = pedidoModelMock.numeroPedido;
pedidoDTOMock.itensPedido = [itemPedidoDTOMock];
pedidoDTOMock.pago = false;
pedidoDTOMock.statusPedido = pedidoModelMock.statusPedido;
pedidoDTOMock.qrCode = null;

export const mensagemGatewayPagamentoDTO = new MensagemMercadoPagoDTO();
mensagemGatewayPagamentoDTO.resource =
  'https://api.mercadolibre.com/merchant_orders/15171882961';
mensagemGatewayPagamentoDTO.topic = 'merchant_order';

export const pedidoGatewayPagamentoDTO = new PedidoGatewayPagamentoDTO();
pedidoGatewayPagamentoDTO.id = 15171882961;
pedidoGatewayPagamentoDTO.status = 'closed';
pedidoGatewayPagamentoDTO.external_reference =
  '0a14aa4e-75e7-405f-8301-81f60646c93d';
const itemDTO = new PaymentDTO();
itemDTO.status = 'approved';
pedidoGatewayPagamentoDTO.payments = [itemDTO];
pedidoGatewayPagamentoDTO.order_status = 'paid';

// Mock jest das funções do repository pedido
export const pedidoRepositoryMock = {
  criarPedido: jest.fn(),
  editarStatusPedido: jest.fn(),
  editarStatusPagamento: jest.fn(),
  buscarPedido: jest.fn(),
  listarPedidos: jest.fn(),
  listarPedidosRecebido: jest.fn(),
  registrarQRCode: jest.fn(),
  guardarMsgWebhook: jest.fn(),
};

// Mock jest da função do factory sql dto de pedido
export const pedidoSQLDTOFactoryMock = {
  criarPedidoDTO: jest.fn(),
};

// Mock jest das funções do service gateway pagamento
export const gatewayPagamentoServiceMock = {
  criarPedido: jest.fn(),
  consultarPedido: jest.fn(),
};

// Mock jest das funções do service da api de pedidos
export const apiPedidosServiceMock = {
  atualizarStatusPedido: jest.fn(),
};

// Mock jest das funções da factory que cria entidade pedido
export const pedidoFactoryMock = {
  criarItemPedido: jest.fn(),
  criarEntidadePedido: jest.fn(),
};

// Mock jest das funções da factory que cria DTO pedido
export const pedidoDTOFactoryMock = {
  criarPedidoDTO: jest.fn(),
  criarListaPedidoDTO: jest.fn(),
  criarListaItemPedidoDTO: jest.fn(),
};

// Mock jest das funções do use case pedido
export const pedidoUseCaseMock = {
  criarPedido: jest.fn(),
  editarPedido: jest.fn(),
  buscarPedido: jest.fn(),
  listarPedidos: jest.fn(),
  listarPedidosRecebido: jest.fn(),
};

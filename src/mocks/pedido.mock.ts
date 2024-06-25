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

export const configServiceMock = {
  getOrThrow: jest.fn((key: string) => {
    if (key === 'ACCESS_TOKEN_MERCADOPAGO') {
      return 'TEST-844********54504-01********443991c5********a5b5e4db********5758942';
    }
    if (key === 'EXTERNAL_POS_ID_MERCADOPAGO') {
      return 'CAIXA01';
    }
    if (key === 'WEBHOOK_URL_MERCADOPAGO') {
      return 'https://www.example.com/';
    }
    if (key === 'IDEMPOTENCY_KEY_MERCADOPAGO') {
      return '0e4990a0-cbac-417a-94f2-a22be7ae9179';
    }
  }),
};

export const pedidoResponseMock = {
  mensagem: 'Pedido atualizado com sucesso',
  body: {
    qrCode: null,
    id: '5c20b15a-247c-4544-9d6c-1474ad46b16d',
    numeroPedido: '44191',
    itensPedido: [
      {
        id: 'fbdfaec9-a4a9-447e-9966-f0b07723aa7d',
        quantidade: 1,
        produto: {
          id: '4511aa20-90b2-45ae-bbf8-3ab05ec85983',
          nome: 'X-tudo',
          descricao:
            'Ingredientes: 1 Hambúrguer, 50 G De Bacon Picados, 1 Ovo, 2 Fatias De Presunto, 2 Fatias De Mussarela (cheddar), 1 Folha De Alface, 1 Rodela De Tomate, 1 Pão De Hambúrguer, 1 Colher De Maionese, Catchup A Gosto (opcional)',
          valorUnitario: 29.9,
          imagemUrl:
            'https://conteudo.imguol.com.br/c/entretenimento/17/2023/05/24/x-tudo-brasileiro-tem-variedade-de-ingredientes-de-acordo-com-preferencias-regionais-aqui-versao-com-carne-bovina-tomato-salsicha-presunto-bacon-e-queijo-no-pao-1684938396547_v2_1x1.jpg',
          categoria: {
            id: '43a7f9e1-632b-4cb6-b7d7-38e1004f2a9c',
            nome: 'Lanches',
            descricao: 'Lanches Para Todos Os Gostos!',
          },
        },
      },
    ],
    pago: true,
    statusPedido: 'em preparacao',
    criadoEm: '2024-05-10T04:26:59.959Z',
    atualizadoEm: '2024-05-10T04:27:21.049Z',
    cliente: {
      id: '88639b90-a9cf-4703-9735-7ab2ff02299b',
      nome: 'Cliente Anônimo',
      email: 'cliente@anonimo.com',
      cpf: '00000000191',
    },
  },
};

export const mercadoPagoResponseMock = {
  qr_data:
    '00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D',
  in_store_order_id: 'd4e8ca59-3e1d-4c03-b1f6-580e87c654ae',
};

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

// Mock jest das funções do adapter da fila de cobranca-gerada
export const filaCobrancaGeradaAdapterMock = {
  publicarCobrancaGerada: jest.fn(),
};

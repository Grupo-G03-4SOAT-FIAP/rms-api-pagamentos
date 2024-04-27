import { Test, TestingModule } from '@nestjs/testing';
import { PedidoFactory } from './pedido.factory';
import {
  criaPedidoDTOMock,
  pedidoEntityNotClienteMock,
} from 'src/mocks/pedido.mock';
import {
  produtoEntityMock,
  produtoEntityNotIdMock,
  produtoFactoryMock,
} from 'src/mocks/produto.mock';
import { categoriaEntityMock } from 'src/mocks/categoria.mock';
import { itemPedidoEntityNotIdMock } from 'src/mocks/item_pedido.mock';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';

describe('PedidoFactory', () => {
  let pedidoFactory: PedidoFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoFactory,
        {
          provide: IProdutoFactory,
          useValue: produtoFactoryMock,
        },
      ],
    }).compile();

    pedidoFactory = module.get<PedidoFactory>(PedidoFactory);
    categoriaEntityMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
    produtoEntityNotIdMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar a entidade pedido', async () => {
    produtoFactoryMock.criarEntidadeProduto.mockReturnValue(produtoEntityMock);

    const result = await pedidoFactory.criarEntidadePedido(criaPedidoDTOMock);

    expect(result).toStrictEqual(pedidoEntityNotClienteMock);
  });

  it('deve criar itens do pedido', async () => {
    produtoFactoryMock.criarEntidadeProduto.mockReturnValue(produtoEntityMock);

    const result = await pedidoFactory.criarItemPedido(
      criaPedidoDTOMock.itensPedido,
    );

    expect(result).toStrictEqual([itemPedidoEntityNotIdMock]);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PedidoDTOFactory } from './pedido.dto.factory';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { produtoDTOFactoryMock, produtoDTOMock } from 'src/mocks/produto.mock';
import { pedidoDTOMock, pedidoEntityMock } from 'src/mocks/pedido.mock';
import {
  itemPedidoDTOMock,
  itemPedidoEntityMock,
} from 'src/mocks/item_pedido.mock';

describe('PedidoDTOFactory', () => {
  let pedidoDTOFactory: PedidoDTOFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoDTOFactory,
        {
          provide: IProdutoDTOFactory,
          useValue: produtoDTOFactoryMock,
        },
      ],
    }).compile();

    pedidoDTOFactory = module.get<PedidoDTOFactory>(PedidoDTOFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um pedidoDTO', () => {
    produtoDTOFactoryMock.criarProdutoDTO.mockReturnValue(produtoDTOMock);

    const result = pedidoDTOFactory.criarPedidoDTO(pedidoEntityMock);

    expect(result).toStrictEqual(pedidoDTOMock);
  });

  it('deve criar uma lista de pedidoDTO', () => {
    produtoDTOFactoryMock.criarProdutoDTO.mockReturnValue(produtoDTOMock);

    const result = pedidoDTOFactory.criarListaPedidoDTO([pedidoEntityMock]);

    expect(result).toStrictEqual([pedidoDTOMock]);
  });

  it('deve criar uma lista vazia de pedidoDTO', () => {
    const result = pedidoDTOFactory.criarListaPedidoDTO([]);
    expect(result).toStrictEqual([]);
  });

  it('deve criar uma lista de itemPedidoDTO', () => {
    produtoDTOFactoryMock.criarProdutoDTO.mockReturnValue(produtoDTOMock);

    const result = pedidoDTOFactory.criarListaItemPedidoDTO(
      pedidoEntityMock.itensPedido,
    );

    expect(produtoDTOFactoryMock.criarProdutoDTO).toHaveBeenCalledWith(
      itemPedidoEntityMock.produto,
    );
    expect(result).toStrictEqual([itemPedidoDTOMock]);
  });
});

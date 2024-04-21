import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';
import { ItemPedidoEntity } from './item_pedido.entity';
import { produtoEntityNotIdMock } from 'src/mocks/produto.mock';

describe('ItemPedidoEntity', () => {
  let produto: ProdutoEntity;
  let quantidade: number;

  beforeEach(() => {
    // Defina as variáveis antes de cada teste
    produto = produtoEntityNotIdMock;
    quantidade = 2;
  });

  it('deve criar uma instância de ItemPedidoEntity', () => {
    const itemPedido = new ItemPedidoEntity(produto, quantidade);

    expect(itemPedido.produto).toEqual(produto);
    expect(itemPedido.quantidade).toEqual(quantidade);
  });

  it('deve criar uma instância de ItemPedidoEntity sem id', () => {
    const itemPedido = new ItemPedidoEntity(produto, quantidade);

    expect(itemPedido.produto).toEqual(produto);
    expect(itemPedido.quantidade).toEqual(quantidade);
  });
});

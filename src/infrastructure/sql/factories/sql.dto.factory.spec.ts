import { produtoModelMock } from '../../../mocks/produto.mock';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { SQLDTOFactory } from './sql.dto.factory';
import { categoriaModelMock } from '../../../mocks/categoria.mock';
import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';
import { pedidoModelMock } from 'src/mocks/pedido.mock';
import { PedidoEntity } from 'src/domain/pedido/entities/pedido.entity';

describe('SQLDTOFactory', () => {
  let sqlDTOFactory: SQLDTOFactory;

  beforeEach(() => {
    sqlDTOFactory = new SQLDTOFactory();
  });

  describe('criarCategoriaDTO', () => {
    it('deve criar uma CategoriaEntity corretamente', () => {
      const categoriaEntity =
        sqlDTOFactory.criarCategoriaDTO(categoriaModelMock);

      expect(categoriaEntity).toBeInstanceOf(CategoriaEntity);
      expect(categoriaEntity.nome).toEqual(categoriaModelMock.nome);
      expect(categoriaEntity.descricao).toEqual(categoriaModelMock.descricao);
      expect(categoriaEntity.id).toEqual(categoriaModelMock.id);
    });
  });

  describe('criarProdutoDTO', () => {
    it('deve criar um ProdutoEntity corretamente', () => {
      const produtoEntity = sqlDTOFactory.criarProdutoDTO(produtoModelMock);

      expect(produtoEntity).toBeInstanceOf(ProdutoEntity);
      expect(produtoEntity.nome).toEqual(produtoModelMock.nome);
      expect(produtoEntity.categoria.id).toEqual(produtoModelMock.categoria.id);
      expect(produtoEntity.id).toEqual(produtoModelMock.id);
    });
  });

  describe('criarPedidoDTO', () => {
    it('deve criar um ProdutoEntity corretamente', () => {
      const pedidoEntity = sqlDTOFactory.criarPedidoDTO(pedidoModelMock);

      expect(pedidoEntity).toBeInstanceOf(PedidoEntity);
      expect(pedidoEntity.id).toEqual(pedidoModelMock.id);
    });
  });
});

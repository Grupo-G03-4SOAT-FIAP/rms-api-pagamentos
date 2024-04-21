import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { ProdutoEntity } from './produto.entity';
import { categoriaEntityMock } from 'src/mocks/categoria.mock';

describe('ProdutoEntity', () => {
  let nome: string;
  let categoria: CategoriaEntity;
  let valorUnitario: number;
  let descricao: string;

  beforeEach(() => {
    // Defina as variáveis antes de cada teste
    nome = 'produto x';
    categoria = categoriaEntityMock;
    valorUnitario = 5.0;
    descricao = 'teste produto x';
  });

  it('deve criar uma instância de ProdutoEntity', () => {
    const produto = new ProdutoEntity(
      nome,
      categoria,
      valorUnitario,
      descricao,
    );

    expect(produto.nome).toEqual('Produto X');
    expect(produto.categoria).toEqual(categoria);
    expect(produto.valorUnitario).toEqual(valorUnitario);
    expect(produto.descricao).toEqual('Teste Produto X');
  });

  it('deve criar uma instância de ProdutoEntity sem descricao e id', () => {
    const produto = new ProdutoEntity(nome, categoria, valorUnitario);

    expect(produto.nome).toEqual('Produto X');
    expect(produto.categoria).toEqual(categoria);
    expect(produto.valorUnitario).toEqual(valorUnitario);
    expect(produto.descricao).toBeUndefined();
    expect(produto.id).toBeUndefined();
  });
});

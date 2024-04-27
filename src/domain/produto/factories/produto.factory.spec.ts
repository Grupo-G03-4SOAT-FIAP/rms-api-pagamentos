import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoFactory } from './produto.factory';
import { produtoDTOMock, produtoEntityMock } from 'src/mocks/produto.mock';
import { CategoriaFactory } from 'src/domain/categoria/factories/categoria.factory';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';

describe('ProdutoFactory', () => {
  let produtoFactory: ProdutoFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoFactory,
        CategoriaFactory,
        {
          provide: ICategoriaFactory,
          useClass: CategoriaFactory,
        },
      ],
    }).compile();

    produtoFactory = module.get<ProdutoFactory>(ProdutoFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar a entidade produto com ProdutoDTO', async () => {
    const result = await produtoFactory.criarEntidadeProduto(produtoDTOMock);

    expect(result).toStrictEqual(produtoEntityMock);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaFactory } from './categoria.factory';
import {
  categoriaDTOMock,
  categoriaEntityMock,
} from 'src/mocks/categoria.mock';

describe('CategoriaFactory', () => {
  let categoriaFactory: CategoriaFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaFactory],
    }).compile();

    categoriaFactory = module.get<CategoriaFactory>(CategoriaFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar a entidade produto com ProdutoDTO', async () => {
    const result =
      await categoriaFactory.criarEntidadeCategoria(categoriaDTOMock);

    expect(result).toStrictEqual(categoriaEntityMock);
  });
});

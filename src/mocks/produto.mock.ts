import { faker } from '@faker-js/faker';
import {
  categoriaDTOMock,
  categoriaEntityMock,
  categoriaModelMock,
} from './categoria.mock';
import { ProdutoModel } from 'src/infrastructure/sql/models/produto.model';
import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';
import {
  AtualizaProdutoDTO,
  CriaProdutoDTO,
  ProdutoDTO,
} from 'src/presentation/rest/v1/presenters/produto/produto.dto';

// Mock para simular dados da tabela produto no banco de dados
export const produtoModelMock = new ProdutoModel();
produtoModelMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
produtoModelMock.nome = 'Produto X';
produtoModelMock.descricao = 'Teste Produto X';
produtoModelMock.valorUnitario = 5.0;
produtoModelMock.imagemUrl = 'http://';
produtoModelMock.categoria = categoriaModelMock;
produtoModelMock.criadoEm = new Date().toISOString();
produtoModelMock.atualizadoEm = new Date().toISOString();
produtoModelMock.excluidoEm = new Date().toISOString();

// Mock para simular dados da entidade produto com todos os itens
export const produtoEntityMock = new ProdutoEntity(
  'Produto X',
  categoriaEntityMock,
  5.0,
  'Teste Produto X',
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular dados da entidade produto sem id
export const produtoEntityNotIdMock = new ProdutoEntity(
  'Produto X',
  categoriaEntityMock,
  5.0,
  'Teste Produto X',
);

// Mock para simular dados da entidade produto sem descricao
export const produtoEntityNotDescricaoMock = new ProdutoEntity(
  'Produto X',
  categoriaEntityMock,
  5.0,
);

// Mock para simular o DTO com os dados recebidos pelo usuario ao criar um produto
export const criaProdutoDTOMock = new CriaProdutoDTO();
criaProdutoDTOMock.nome = 'Produto X';
criaProdutoDTOMock.descricao = 'Teste Produto X';
criaProdutoDTOMock.valorUnitario = 5.0;
criaProdutoDTOMock.imagemUrl = 'http://';
criaProdutoDTOMock.categoriaId = '0a14aa4e-75e7-405f-8301-81f60646c93d';

// Mock para simular o DTO com os dados recebidos pelo usuario ao atualizar um produto
export const atualizaProdutoDTOMock = new AtualizaProdutoDTO();
atualizaProdutoDTOMock.nome = 'Produto X';
atualizaProdutoDTOMock.descricao = 'Teste Produto X';
atualizaProdutoDTOMock.valorUnitario = 5.0;
atualizaProdutoDTOMock.imagemUrl = 'http://';
atualizaProdutoDTOMock.categoriaId = '0a14aa4e-75e7-405f-8301-81f60646c93d';

// Mock para simular o DTO com dados de produto enviados para o usuario ao responder uma requisição
export const produtoDTOMock = new ProdutoDTO();
produtoDTOMock.id = produtoModelMock.id;
produtoDTOMock.nome = produtoModelMock.nome;
produtoDTOMock.descricao = produtoModelMock.descricao;
produtoDTOMock.valorUnitario = produtoModelMock.valorUnitario;
produtoDTOMock.categoria = categoriaDTOMock;

// Mock jest da função do factory sql dto de produto
export const produtoSQLDTOFactoryMock = {
  criarProdutoDTO: jest.fn(),
};

// Mock jest das funções da factory que cria entidade produto
export const produtoFactoryMock = {
  criarEntidadeProduto: jest.fn(),
};

// Mock jest das funções da factory que cria DTO produto
export const produtoDTOFactoryMock = {
  criarProdutoDTO: jest.fn(),
  criarListaProdutoDTO: jest.fn(),
};

// Mock jest das funções do use case produto
export const produtoUseCaseMock = {
  criarProduto: jest.fn(),
  editarProduto: jest.fn(),
  excluirProduto: jest.fn(),
  buscarProduto: jest.fn(),
  listarProdutos: jest.fn(),
  listarProdutosPorCategoria: jest.fn(),
};

export const criarFakeProdutoDTO = (categoriaId: string): CriaProdutoDTO => {
  const criaProdutoDTO = new CriaProdutoDTO();
  criaProdutoDTO.nome = `${faker.commerce.product()} - ${faker.string.uuid()}`;
  criaProdutoDTO.descricao = faker.commerce.productDescription();
  criaProdutoDTO.valorUnitario = parseFloat(faker.commerce.price());
  criaProdutoDTO.imagemUrl = faker.image.url();
  criaProdutoDTO.categoriaId = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  criaProdutoDTO.categoriaId = categoriaId;
  return criaProdutoDTO;
};

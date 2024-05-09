import { faker } from '@faker-js/faker';
import { produtoModelMock } from './produto.mock';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import {
  AtualizaCategoriaDTO,
  CategoriaDTO,
  CriaCategoriaDTO,
} from 'src/presentation/rest/v1/presenters/categoria/categoria.dto';
import { CategoriaModel } from 'src/infrastructure/sql/models/categoria.model';

// Mock para simular dados da tabela categoria no banco de dados
export const categoriaModelMock = new CategoriaModel();
categoriaModelMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
categoriaModelMock.nome = 'Lanche';
categoriaModelMock.descricao = 'Lanche X Tudo';
categoriaModelMock.produtos = [produtoModelMock];
categoriaModelMock.criadoEm = new Date().toISOString();
categoriaModelMock.atualizadoEm = new Date().toISOString();
categoriaModelMock.excluidoEm = new Date().toISOString();

// Mock para simular dados da entidade categoria com todos os itens
export const categoriaEntityMock = new CategoriaEntity(
  'Lanche',
  'Lanche X Tudo',
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular dados da entidade categoria sem id
export const categoriaEntityNotIdMock = new CategoriaEntity(
  'Lanche',
  'Lanche X Tudo',
);

// Mock para simular dados da entidade categoria sem descricao
export const categoriaEntityNotDescricaoMock = new CategoriaEntity('Lanche');

// Mock para simular o DTO com os dados recebidos pelo usuario ao criar uma categoria
export const criaCategoriaDTOMock = new CriaCategoriaDTO();
criaCategoriaDTOMock.nome = categoriaModelMock.nome;
criaCategoriaDTOMock.descricao = categoriaModelMock.descricao;

// Mock para simular o DTO com os dados recebidos pelo usuario ao atualizar uma categoria
export const atualizaCategoriaDTOMock = new AtualizaCategoriaDTO();
atualizaCategoriaDTOMock.nome = categoriaModelMock.nome;
atualizaCategoriaDTOMock.descricao = categoriaModelMock.descricao;

// Mock para simular o DTO com dados de categoria enviados para o usuario ao responder uma requisição
export const categoriaDTOMock = new CategoriaDTO();
categoriaDTOMock.id = categoriaEntityMock.id;
categoriaDTOMock.nome = categoriaEntityMock.nome;
categoriaDTOMock.descricao = categoriaEntityMock.descricao;

// Mock jest das funções do repository categoria
export const categoriaRepositoryMock = {
  criarCategoria: jest.fn(),
  editarCategoria: jest.fn(),
  excluirCategoria: jest.fn(),
  buscarCategoriaPorId: jest.fn(),
  buscarCategoriaPorNome: jest.fn(),
  listarCategorias: jest.fn(),
};

// Mock jest da função do factory sql dto de categoria
export const categoriaSQLDTOFactoryMock = {
  criarCategoriaDTO: jest.fn(),
};

// Mock jest das funções da factory que cria DTO categoria
export const categoriaDTOFactoryMock = {
  criarCategoriaDTO: jest.fn(),
  criarListaCategoriaDTO: jest.fn(),
};

// Mock jest das funções do use case categoria
export const categoriaUseCaseMock = {
  criarCategoria: jest.fn(),
  editarCategoria: jest.fn(),
  excluirCategoria: jest.fn(),
  buscarCategoria: jest.fn(),
  listarCategorias: jest.fn(),
};

export const criarFakeCategoriaDTO = (): CriaCategoriaDTO => {
  const criaCategoriaDTO = new CriaCategoriaDTO();
  criaCategoriaDTO.nome = `Categoria ${faker.string.uuid()}`;
  criaCategoriaDTO.descricao = `Descricão ${faker.string.uuid()}`;
  return criaCategoriaDTO;
};

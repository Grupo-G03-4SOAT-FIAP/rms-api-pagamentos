import {
  produtoDTOMock,
  produtoEntityMock,
  produtoModelMock,
} from './produto.mock';
import { pedidoModelMock } from './pedido.mock';
import { Repository } from 'typeorm';
import { ItemPedidoModel } from 'src/infrastructure/sql/models/item_pedido.model';
import { ItemPedidoEntity } from 'src/domain/pedido/entities/item_pedido.entity';
import {
  CriaItemPedidoDTO,
  ItemPedidoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/item_pedido.dto';
import { ClientePedidoModel } from 'src/infrastructure/sql/models/cliente_pedido.model';
import { ProdutoDTO } from 'src/presentation/rest/v1/presenters/produto/produto.dto';

// Mock para simular dados da tabela item pedido no banco de dados
export const itemPedidoModelMock = new ItemPedidoModel();
itemPedidoModelMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
itemPedidoModelMock.pedido = pedidoModelMock;
itemPedidoModelMock.produto = produtoModelMock;
itemPedidoModelMock.quantidade = 2;
itemPedidoModelMock.criadoEm = new Date().toISOString();
itemPedidoModelMock.atualizadoEm = new Date().toISOString();

// Mock para simular dados da entidade item pedido com todos os itens
export const itemPedidoEntityMock = new ItemPedidoEntity(
  produtoEntityMock,
  2,
  '0a14aa4e-75e7-405f-8301-81f60646c93d',
);

// Mock para simular dados da entidade item pedido sem id
export const itemPedidoEntityNotIdMock = new ItemPedidoEntity(
  produtoEntityMock,
  2,
);

// Mock para simular o DTO com os dados recebidos pelo usuario ao criar um pedido
export const criaItemPedidoDTOMock = new CriaItemPedidoDTO();
criaItemPedidoDTOMock.produto = new ProdutoDTO();
criaItemPedidoDTOMock.produto.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
criaItemPedidoDTOMock.quantidade = 2;

// Mock para simular o DTO com dados de item pedido enviados para o usuario ao responder uma requisição
export const itemPedidoDTOMock = new ItemPedidoDTO();
itemPedidoDTOMock.id = itemPedidoModelMock.id;
itemPedidoDTOMock.produto = produtoDTOMock;
itemPedidoDTOMock.quantidade = itemPedidoModelMock.quantidade;

// Mock jest das funções do typeORM interagindo com a tabela item pedido
export const itemPedidoTypeORMMock: jest.Mocked<Repository<ItemPedidoModel>> = {
  create: jest.fn(),
  save: jest.fn(),
} as Partial<jest.Mocked<Repository<ItemPedidoModel>>> as jest.Mocked<
  Repository<ItemPedidoModel>
>;

// Mock jest das funções do typeORM interagindo com a tabela cliente pedido
export const clientePedidoTypeORMMock: jest.Mocked<
  Repository<ClientePedidoModel>
> = {
  create: jest.fn(),
  save: jest.fn(),
} as Partial<jest.Mocked<Repository<ClientePedidoModel>>> as jest.Mocked<
  Repository<ClientePedidoModel>
>;

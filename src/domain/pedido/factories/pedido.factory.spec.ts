import { Test, TestingModule } from '@nestjs/testing';
import { PedidoFactory } from './pedido.factory';
import { PedidoService } from '../services/pedido.service';
import { IProdutoRepository } from 'src/domain/produto/interfaces/produto.repository.port';
import { IClienteRepository } from 'src/domain/cliente/interfaces/cliente.repository.port';
import { ClienteNaoLocalizadoErro } from 'src/domain/cliente/exceptions/cliente.exception';
import {
  criaPedidoDTOMock,
  pedidoEntityNotClienteMock,
  pedidoServiceMock,
} from 'src/mocks/pedido.mock';
import {
  produtoEntityMock,
  produtoEntityNotIdMock,
  produtoFactoryMock,
  produtoRepositoryMock,
} from 'src/mocks/produto.mock';
import {
  clienteEntityMock,
  clienteRepositoryMock,
} from 'src/mocks/cliente.mock';
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
          provide: PedidoService,
          useValue: pedidoServiceMock,
        },
        {
          provide: IClienteRepository,
          useValue: clienteRepositoryMock,
        },
        {
          provide: IProdutoRepository,
          useValue: produtoRepositoryMock,
        },
        {
          provide: IProdutoFactory,
          useValue: produtoFactoryMock,
        },
      ],
    }).compile();

    pedidoFactory = module.get<PedidoFactory>(PedidoFactory);
    clienteEntityMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
    categoriaEntityMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
    produtoEntityNotIdMock.id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar a entidade pedido', async () => {
    produtoFactoryMock.criarEntidadeProdutoDeProdutoDTO.mockReturnValue(
      produtoEntityMock,
    );

    const result = await pedidoFactory.criarEntidadePedido(criaPedidoDTOMock);

    expect(result).toStrictEqual(pedidoEntityNotClienteMock);
  });

  it('deve criar itens do pedido', async () => {
    produtoFactoryMock.criarEntidadeProdutoDeProdutoDTO.mockReturnValue(
      produtoEntityMock,
    );

    const result = await pedidoFactory.criarItemPedido(
      criaPedidoDTOMock.itensPedido,
    );

    expect(result).toStrictEqual([itemPedidoEntityNotIdMock]);
  });

  it('deve criar a entidade cliente', async () => {
    clienteRepositoryMock.buscarClientePorCPF.mockReturnValue(
      clienteEntityMock,
    );

    const result = await pedidoFactory.criarEntidadeClienteDoCPF(
      criaPedidoDTOMock.cliente.cpf,
    );

    expect(clienteRepositoryMock.buscarClientePorCPF).toHaveBeenCalled();
    expect(result).toStrictEqual(clienteEntityMock);
  });

  it('deve criar a entidade cliente e retornar ClienteNaoLocalizadoErro', async () => {
    clienteRepositoryMock.buscarClientePorCPF.mockReturnValue(null);

    await expect(
      pedidoFactory.criarEntidadeClienteDoCPF(criaPedidoDTOMock.cliente.cpf),
    ).rejects.toThrow(
      new ClienteNaoLocalizadoErro('Cliente informado não existe'),
    );
    expect(clienteRepositoryMock.buscarClientePorCPF).toHaveBeenCalledWith(
      criaPedidoDTOMock.cliente.cpf,
    );
  });
});

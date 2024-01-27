import { Test, TestingModule } from '@nestjs/testing';
import { PedidoEntityFactory } from './pedido.entity.factory';
import { StatusPedido } from '../enums/pedido.enum';
import { clienteEntityMock } from 'src/mocks/cliente.mock';
import {
  pedidoEntityMock,
  pedidoEntityNotClienteMock,
  pedidoEntityNotIdMock,
} from 'src/mocks/pedido.mock';
import { ItemPedidoEntity } from '../entities/item_pedido.entity';
import { ClienteEntity } from 'src/domain/cliente/entities/cliente.entity';
import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';
import { produtoEntityMock } from 'src/mocks/produto.mock';
import {
  itemPedidoEntityMock,
  itemPedidoEntityNotIdMock,
} from 'src/mocks/item_pedido.mock';

describe('PedidoEntityFactory', () => {
  let pedidoEntityFactory: PedidoEntityFactory;
  let itensPedido: ItemPedidoEntity[];
  let statusPedido: StatusPedido;
  let numeroPedido: string;
  let pago: boolean;
  let cliente: ClienteEntity;
  let id: string;
  let produto: ProdutoEntity;
  let quantidade: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoEntityFactory],
    }).compile();

    pedidoEntityFactory = module.get<PedidoEntityFactory>(PedidoEntityFactory);
    itensPedido = [itemPedidoEntityMock];
    statusPedido = StatusPedido.RECEBIDO;
    numeroPedido = '05012024';
    pago = false;
    cliente = clienteEntityMock;
    id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
    produto = produtoEntityMock;
    quantidade = 2;
  });

  it('deve criar uma entidade pedido', () => {
    const result = pedidoEntityFactory.criarEntidadePedido(
      itensPedido,
      statusPedido,
      numeroPedido,
      pago,
      cliente,
      id,
    );
    expect(result).toStrictEqual(pedidoEntityMock);
  });

  it('deve criar uma entidade pedido sem id', () => {
    const result = pedidoEntityFactory.criarEntidadePedido(
      itensPedido,
      statusPedido,
      numeroPedido,
      pago,
      cliente,
    );
    expect(result).toStrictEqual(pedidoEntityNotIdMock);
  });

  it('deve criar uma entidade pedido sem cliente', () => {
    const result = pedidoEntityFactory.criarEntidadePedido(
      itensPedido,
      statusPedido,
      numeroPedido,
      pago,
    );
    expect(result).toStrictEqual(pedidoEntityNotClienteMock);
  });

  it('deve criar uma entidade item pedido', () => {
    const result = pedidoEntityFactory.criarEntidadeItemPedido(
      produto,
      quantidade,
      id,
    );
    expect(result).toStrictEqual(itemPedidoEntityMock);
  });

  it('deve criar uma entidade item pedido sem id', () => {
    const result = pedidoEntityFactory.criarEntidadeItemPedido(
      produto,
      quantidade,
    );
    expect(result).toStrictEqual(itemPedidoEntityNotIdMock);
  });
});
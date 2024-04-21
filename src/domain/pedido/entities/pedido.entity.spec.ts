import { PedidoEntity } from './pedido.entity';
import { ItemPedidoEntity } from './item_pedido.entity';
import { StatusPedido } from '../enums/pedido.enum';
import { itemPedidoEntityMock } from 'src/mocks/item_pedido.mock';

describe('PedidoEntity', () => {
  let itensPedido: ItemPedidoEntity[];
  let statusPedido: StatusPedido;
  let numeroPedido: string;
  let pago: boolean;
  let id: string;

  beforeEach(() => {
    // Defina as variáveis antes de cada teste
    itensPedido = [itemPedidoEntityMock];
    statusPedido = StatusPedido.RECEBIDO;
    numeroPedido = '05012024';
    pago = false;
    id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  it('deve criar uma instância de PedidoEntity', () => {
    const pedido = new PedidoEntity(
      itensPedido,
      statusPedido,
      numeroPedido,
      pago,
      id,
    );

    expect(pedido.itensPedido).toEqual(itensPedido);
    expect(pedido.statusPedido).toEqual(statusPedido);
    expect(pedido.numeroPedido).toEqual(numeroPedido);
    expect(pedido.pago).toEqual(pago);
    expect(pedido.id).toEqual(id);
  });

  it('deve criar uma instância de PedidoEntity sem cliente e id', () => {
    const pedido = new PedidoEntity(
      itensPedido,
      statusPedido,
      numeroPedido,
      pago,
    );

    expect(pedido.itensPedido).toEqual(itensPedido);
    expect(pedido.statusPedido).toEqual(statusPedido);
    expect(pedido.numeroPedido).toEqual(numeroPedido);
    expect(pedido.pago).toEqual(pago);
    expect(pedido.id).toBeUndefined();
  });
});

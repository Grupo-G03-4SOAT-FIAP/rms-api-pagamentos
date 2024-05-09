import { ItemPedidoModel } from './item_pedido.model';

export class PedidoModel {
  id: string;
  numeroPedido: string;
  itensPedido: ItemPedidoModel[];
  pago: boolean;
  statusPedido: string;
  criadoEm: string;
  atualizadoEm: string;
}

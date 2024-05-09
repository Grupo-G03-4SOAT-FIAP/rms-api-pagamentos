import { PedidoModel } from './pedido.model';
import { ProdutoModel } from './produto.model';

export class ItemPedidoModel {
  id: string;
  pedido: PedidoModel;
  produto: ProdutoModel;
  quantidade: number;
  criadoEm: string;
  atualizadoEm: string;
}

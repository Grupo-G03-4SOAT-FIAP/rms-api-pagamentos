import { ItemPedidoDTO } from '../../../presentation/rest/v1/presenters/pedido/item_pedido.dto';

export interface IItemPedidoDTOFactory {
  criarItemPedidoDTO(produto: string, quantidade: number): ItemPedidoDTO;
}

export const IItemPedidoDTOFactory = Symbol('IItemPedidoDTOFactory');

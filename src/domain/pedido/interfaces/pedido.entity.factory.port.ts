import { PedidoEntity } from '../entities/pedido.entity';
import { StatusPedido } from '../enums/pedido.enum';
import { ItemPedidoEntity } from '../entities/item_pedido.entity';
import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';

export interface IPedidoEntityFactory {
  criarEntidadePedido(
    itensPedido: ItemPedidoEntity[],
    statusPedido: StatusPedido,
    numeroPedido: string,
    pago: boolean,
    id?: string,
    criadoEm?: string,
    atualizadoEm?: string,
  ): PedidoEntity;

  criarEntidadeItemPedido(
    produto: ProdutoEntity,
    quantidade: number,
    id?: string,
  ): ItemPedidoEntity;
}

export const IPedidoEntityFactory = Symbol('IPedidoEntityFactory');

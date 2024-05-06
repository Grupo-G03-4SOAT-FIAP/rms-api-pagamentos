import { Inject, Injectable } from '@nestjs/common';
import { IPedidoFactory } from '../interfaces/pedido.factory.port';
import { ItemPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/item_pedido.dto';
import { ItemPedidoEntity } from '../entities/item_pedido.entity';
import { CriaPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import { PedidoEntity } from '../entities/pedido.entity';
import { StatusPedido } from '../enums/pedido.enum';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';

@Injectable()
export class PedidoFactory implements IPedidoFactory {
  constructor(
    @Inject(IProdutoFactory)
    private readonly produtoFactory: IProdutoFactory,
  ) {}

  async criarItemPedido(itens: ItemPedidoDTO[]): Promise<ItemPedidoEntity[]> {
    const itensPedido = await Promise.all(
      itens.map(async (item) => {
        const produto = await this.produtoFactory.criarEntidadeProduto(
          item.produto,
        );
        const itemPedidoEntity = new ItemPedidoEntity(produto, item.quantidade);
        return itemPedidoEntity;
      }),
    );
    return itensPedido;
  }

  async criarEntidadePedido(pedido: CriaPedidoDTO): Promise<PedidoEntity> {
    const itensPedido = await this.criarItemPedido(pedido.itensPedido);

    return new PedidoEntity(
      itensPedido,
      StatusPedido.RECEBIDO,
      pedido.numeroPedido,
      false,
      pedido.id,
    );
  }
}

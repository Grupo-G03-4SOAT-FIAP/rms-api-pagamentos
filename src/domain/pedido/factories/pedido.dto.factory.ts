import { Inject, Injectable } from '@nestjs/common';
import { IPedidoDTOFactory } from '../interfaces/pedido.dto.factory.port';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { PedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import { ItemPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/item_pedido.dto';
import { PedidoEntity } from '../entities/pedido.entity';
import { ItemPedidoEntity } from '../entities/item_pedido.entity';

@Injectable()
export class PedidoDTOFactory implements IPedidoDTOFactory {
  constructor(
    @Inject(IProdutoDTOFactory)
    private readonly produtoDTOFactory: IProdutoDTOFactory,
  ) {}

  criarPedidoDTO(pedido: PedidoEntity): PedidoDTO {
    const itensPedido = this.criarListaItemPedidoDTO(pedido.itensPedido);

    const pedidoDTO = new PedidoDTO();
    pedidoDTO.id = pedido.id;
    pedidoDTO.numeroPedido = pedido.numeroPedido;
    pedidoDTO.itensPedido = itensPedido;
    pedidoDTO.pago = pedido.pago;
    pedidoDTO.statusPedido = pedido.statusPedido;
    return pedidoDTO;
  }

  criarListaPedidoDTO(pedidos: PedidoEntity[]): PedidoDTO[] | [] {
    const listaPedidosDTO = pedidos.map((pedido: PedidoEntity) => {
      const pedidoDTO = this.criarPedidoDTO(pedido);
      return pedidoDTO;
    });

    return listaPedidosDTO;
  }

  criarItemPedidoDTO(itemPedido: ItemPedidoEntity): ItemPedidoDTO {
    const produto = this.produtoDTOFactory.criarProdutoDTO(itemPedido.produto);
    const itemPedidoDTO = new ItemPedidoDTO();
    itemPedidoDTO.quantidade = itemPedido.quantidade;
    itemPedidoDTO.produto = produto;
    return itemPedidoDTO;
  }

  criarListaItemPedidoDTO(itemPedidos: ItemPedidoEntity[]): ItemPedidoDTO[] {
    const listaItensPedidoDTO = itemPedidos.map(
      (itemPedido: ItemPedidoEntity) => {
        const itemPedidoDTO = this.criarItemPedidoDTO(itemPedido);
        return itemPedidoDTO;
      },
    );

    return listaItensPedidoDTO;
  }
}

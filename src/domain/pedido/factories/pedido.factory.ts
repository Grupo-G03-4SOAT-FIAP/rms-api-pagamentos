import { Inject, Injectable } from '@nestjs/common';
import { IPedidoFactory } from '../interfaces/pedido.factory.port';
import { PedidoService } from '../services/pedido.service';
import { IClienteRepository } from 'src/domain/cliente/interfaces/cliente.repository.port';
import { IProdutoRepository } from 'src/domain/produto/interfaces/produto.repository.port';
import { CriaItemPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/item_pedido.dto';
import { ItemPedidoEntity } from '../entities/item_pedido.entity';
import { ClienteEntity } from 'src/domain/cliente/entities/cliente.entity';
import { ClienteNaoLocalizadoErro } from 'src/domain/cliente/exceptions/cliente.exception';
import { CriaPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import { PedidoEntity } from '../entities/pedido.entity';
import { StatusPedido } from '../enums/pedido.enum';
import { ClienteDTO } from 'src/presentation/rest/v1/presenters/cliente/cliente.dto';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';

@Injectable()
export class PedidoFactory implements IPedidoFactory {
  constructor(
    private readonly pedidoService: PedidoService,
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(IProdutoRepository)
    private readonly produtoRepository: IProdutoRepository,
    @Inject(IProdutoFactory)
    private readonly produtoFactory: IProdutoFactory,
  ) {}

  async criarEntidadeCliente(clienteDTO: ClienteDTO): Promise<ClienteEntity> {
    return new ClienteEntity(
      clienteDTO.nome,
      clienteDTO.email,
      clienteDTO.cpf,
      clienteDTO.id,
    );
  }

  async criarItemPedido(
    itens: CriaItemPedidoDTO[],
  ): Promise<ItemPedidoEntity[]> {
    const itensPedido = await Promise.all(
      itens.map(async (item) => {
        const produto = await this.produtoFactory.criarEntidadeProdutoDeProdutoDTO(item.produto);
        const itemPedidoEntity = new ItemPedidoEntity(produto, item.quantidade, item.id);
        return itemPedidoEntity;
      }),
    );
    return itensPedido;
  }

  async criarEntidadeClienteDoCPF(
    cpfCliente?: string,
  ): Promise<ClienteEntity | null> {
    const cliente =
      await this.clienteRepository.buscarClientePorCPF(cpfCliente);
    if (!cliente) {
      throw new ClienteNaoLocalizadoErro('Cliente informado não existe');
    }
    return cliente;
  }

  async criarEntidadePedido(pedido: CriaPedidoDTO): Promise<PedidoEntity> {
    const itensPedido = await this.criarItemPedido(pedido.itensPedido);

    return new PedidoEntity(
      itensPedido,
      StatusPedido.RECEBIDO,
      pedido.numeroPedido,
      false,
      undefined,
      pedido.id,
    );
  }
}

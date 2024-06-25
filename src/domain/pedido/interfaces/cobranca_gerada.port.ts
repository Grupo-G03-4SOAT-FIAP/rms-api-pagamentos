import { PedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';

export interface IFilaCobrancaGeradaAdapter {
  publicarCobrancaGerada(pedidoDTO: PedidoDTO);
}

export const IFilaCobrancaGeradaAdapter = Symbol('IFilaCobrancaGeradaAdapter');

import { PedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';

export interface IFilaFalhaCobrancaAdapter {
  publicarFalhaCobranca(pedidoDTO: PedidoDTO);
}

export const IFilaFalhaCobrancaAdapter = Symbol('IFilaFalhaCobrancaAdapter');

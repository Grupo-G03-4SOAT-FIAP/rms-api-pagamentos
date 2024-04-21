export interface IApiPedidosService {
  atualizarStatusPedido(idPedido: string): Promise<void>;
}

export const IApiPedidosService = Symbol('IApiPedidosService');

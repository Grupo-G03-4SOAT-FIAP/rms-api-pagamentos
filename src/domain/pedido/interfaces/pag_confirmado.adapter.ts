export interface IFilaPagamentoConfirmadoAdapter {
  publicarPagamentoConfirmado(idPedido: string): Promise<void>;
}

export const IFilaPagamentoConfirmadoAdapter = Symbol(
  'IFilaPagamentoConfirmadoAdapter',
);

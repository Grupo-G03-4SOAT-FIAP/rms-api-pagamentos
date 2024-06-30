export interface IFilaFalhaPagamentoAdapter {
  publicarFalhaPagamento(idPedido: string): Promise<void>;
}

export const IFilaFalhaPagamentoAdapter = Symbol('IFilaFalhaPagamentoAdapter');

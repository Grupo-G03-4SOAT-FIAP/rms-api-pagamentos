export interface IPedidoRepository {
  registrarQRCode(idPedido: string, qrData: string, date: Date): Promise<void>;
  guardarMsgWebhook(mensagem: any): Promise<void>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

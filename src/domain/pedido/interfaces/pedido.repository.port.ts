import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';
import { RetornoMP } from 'src/domain/pagamento/entities/retorno_mp.entity';

export interface IPedidoRepository {
  registrarQRCode(
    idPedido: string,
    qrData: string,
    date: Date,
  ): Promise<Pagamento>;
  guardarMsgWebhook(id: string, topic: string): Promise<RetornoMP>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';
import { RetornoMPDTO } from 'src/domain/pagamento/interfaces/retorno_mp.dto';

export interface IPedidoRepository {
  registrarQRCode(
    idPedido: string,
    qrData: string,
    date: Date,
  ): Promise<Pagamento>;
  guardarMsgWebhook(
    id: string,
    topic: string,
    mensagem: string,
  ): Promise<RetornoMPDTO>;
}

export const IPedidoRepository = Symbol('IPedidoRepository');

import { Injectable } from '@nestjs/common';
import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';
import { RetornoMPDTO } from 'src/domain/pagamento/interfaces/retorno_mp.dto';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { IDataServices } from 'src/abstracts';

@Injectable()
export class PedidoRepository implements IPedidoRepository {
  constructor(private dataServices: IDataServices) {}

  async registrarQRCode(
    idPedido: string,
    qrData: string,
    date: any,
  ): Promise<Pagamento> {
    try {
      const registroCriado = await this.dataServices.pagamento.create({
        id_pedido: idPedido,
        qr_data: qrData,
        date: date,
      });
      return registroCriado;
    } catch (error) {
      throw new Error(error);
    }
  }

  async guardarMsgWebhook(
    id,
    topic: string,
    mensagem?: string,
  ): Promise<RetornoMPDTO> {
    try {
      const retornoMp = await this.dataServices.retorno_mp.create({
        id,
        topic,
        mensagem,
      });
      return retornoMp;
    } catch (error) {
      throw new Error(error);
    }
  }
}

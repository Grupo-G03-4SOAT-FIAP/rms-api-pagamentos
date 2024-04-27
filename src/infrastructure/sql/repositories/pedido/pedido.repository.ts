import { Injectable } from '@nestjs/common';
import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';
import { RetornoMP } from 'src/domain/pagamento/entities/retorno_mp.entity';
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

  async guardarMsgWebhook(mensagem: any): Promise<RetornoMP> {
    try {
      const retornoMp = await this.dataServices.retorno_mp.create({
        message: mensagem,
      });
      return retornoMp;
    } catch (error) {
      throw new Error(error);
    }
  }
}

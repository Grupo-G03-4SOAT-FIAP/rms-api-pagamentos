import { Injectable } from '@nestjs/common';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { SQLDTOFactory } from '../../factories/sql.dto.factory';

@Injectable()
export class PedidoRepository implements IPedidoRepository {
  constructor(private readonly sqlDTOFactory: SQLDTOFactory) {}

  async registrarQRCode(idPedido: string, qrData: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async guardarMsgWebhook(mensagem: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

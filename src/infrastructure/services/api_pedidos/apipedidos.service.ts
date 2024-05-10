import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import axios from 'axios';

@Injectable()
export class ApiPedidosService implements IApiPedidosService {
  private _urlApiPedidos: string;

  constructor(private configService: ConfigService) {
    this._urlApiPedidos = this.configService.get<string>('URL_API_PEDIDOS');
  }

  async atualizarStatusPedido(idPedido: string): Promise<void> {
    try {
      await axios.put(`${this._urlApiPedidos}/${idPedido}`, {
        pago: true,
        statusPedido: 'em_preparacao',
      });
    } catch (error) {
      throw new Error('Ocorreu um erro ao atualizar o status do pedido.');
    }
  }
}

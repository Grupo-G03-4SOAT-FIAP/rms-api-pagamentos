import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import axios from 'axios';

@Injectable()
export class ApiPedidosService implements IApiPedidosService {
  private _baseUrlApiPedidos: string;

  constructor(private configService: ConfigService) {
    this._baseUrlApiPedidos = this.configService.get<string>(
      'BASE_URL_API_PEDIDOS',
    );
  }

  async atualizarStatusPedido(idPedido: string): Promise<void> {
    // TODO: Fazer request para a API de Pedidos em PUT /pedidos:id aqui

    const data = JSON.stringify({
      pago: true,
      statusPedido: 'em preparacao',
    });

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${this._baseUrlApiPedidos}/pedido/${idPedido}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

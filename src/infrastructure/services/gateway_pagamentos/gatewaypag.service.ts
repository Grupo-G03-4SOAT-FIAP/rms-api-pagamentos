import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, MerchantOrder } from 'mercadopago';
import { DateTime } from 'luxon';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { PedidoGatewayPagamentoDTO } from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';
import { PedidoEntity } from 'src/domain/pedido/entities/pedido.entity';
import axios from 'axios';
import BigNumber from 'bignumber.js';

@Injectable()
export class GatewayMercadoPagoService implements IGatewayPagamentoService {
  private _baseUrlApiMP: string;
  private _accessToken: string;
  private _user_id: string;
  private _external_pos_id: string;
  private _webhookURL: string;
  private _idempotencyKey: string;

  constructor(
    private readonly logger: Logger,
    private configService: ConfigService,
  ) {
    this._baseUrlApiMP = this.configService.getOrThrow<string>(
      'BASE_URL_API_MERCADOPAGO',
    );
    this._accessToken = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_MERCADOPAGO',
    );
    this._user_id = this.configService.getOrThrow<string>(
      'USER_ID_MERCADOPAGO',
    );
    this._external_pos_id = this.configService.getOrThrow<string>(
      'EXTERNAL_POS_ID_MERCADOPAGO',
    );
    this._webhookURL = this.configService.getOrThrow<string>(
      'WEBHOOK_URL_MERCADOPAGO',
    );
    this._idempotencyKey = this.configService.getOrThrow<string>(
      'IDEMPOTENCY_KEY_MERCADOPAGO',
    );
  }

  async criarPedido(pedido: PedidoEntity): Promise<string> {
    this.logger.debug(
      `Criando pedido QR Code Modelo Dinâmico no Mercado Pago...`,
    );

    const dataValidadeQrCode = DateTime.now()
      .setZone('UTC')
      .plus({ minutes: 15 })
      .toISO();
    const itensPedidoMercadoPago = this.gerarItensPedidoMercadoPago(
      pedido.itensPedido,
    );
    const data = JSON.stringify({
      title: 'Product order',
      description: 'Purchase description.',
      expiration_date: dataValidadeQrCode.toString(), // Campo opcional
      external_reference: pedido.id.toString(), // Número interno do pedido dentro da sua loja
      items: itensPedidoMercadoPago,
      notification_url: this._webhookURL,
      total_amount: this.calcularValorTotalPedido(itensPedidoMercadoPago),
    });

    const baseUrlApiMP = this._baseUrlApiMP;
    const user_id = this._user_id;
    const external_pos_id = this._external_pos_id;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrlApiMP}/instore/orders/qr/seller/collectors/${user_id}/pos/${external_pos_id}/qrs`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.data.qr_data) {
        this.logger.log(
          `QR Code Modelo Dinâmico gerado com sucesso no Mercado Pago para o pedido ${pedido.id}`,
          response.data,
        );
        const qr_data = response.data.qr_data;
        return qr_data;
      }
    } catch (error) {
      this.logger.error(
        `Ocorreu um erro ao gerar QR Code Modelo Dinâmico para o pedido ${pedido.id}`,
        error,
      );
      throw error;
    }
  }

  private gerarItensPedidoMercadoPago(itensPedido) {
    const itensPedidoMercadoPago = itensPedido.map((itemPedidoSuaLoja) => ({
      sku_number: itemPedidoSuaLoja.produto.id ?? null, // Campo opcional
      category: itemPedidoSuaLoja.produto.categoria?.nome ?? null, // Campo opcional
      title: itemPedidoSuaLoja.produto.nome,
      description: itemPedidoSuaLoja.produto.descricao ?? null, // Campo opcional
      unit_price: itemPedidoSuaLoja.produto.valorUnitario,
      quantity: itemPedidoSuaLoja.quantidade,
      unit_measure: 'UNID',
      total_amount: this.calcularValorTotalItemPedido(itemPedidoSuaLoja),
    }));
    return itensPedidoMercadoPago;
  }

  private calcularValorTotalItemPedido(itemPedidoSuaLoja): number {
    const quantidade = new BigNumber(itemPedidoSuaLoja.quantidade);
    const valorUnitario = new BigNumber(
      itemPedidoSuaLoja.produto.valorUnitario,
    );
    return valorUnitario.multipliedBy(quantidade).toNumber();
  }

  private calcularValorTotalPedido(itensPedidoMercadoPago): number {
    return itensPedidoMercadoPago.reduce((valorTotalPedido, itemPedido) => {
      return BigNumber.sum(
        valorTotalPedido,
        itemPedido.total_amount,
      ).toNumber();
    }, 0); // Deve ser a soma do total de todos os itens do pedido
  }

  async consultarPedido(idPedido: string): Promise<PedidoGatewayPagamentoDTO> {
    this.logger.debug(
      `Consultando pedido ${idPedido} no Mercado Pago`,
      idPedido,
    );
    // Consulta o pedido usando a SDK do Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: this._accessToken,
      options: { timeout: 5000, idempotencyKey: this._idempotencyKey },
    });
    const customerClient = new MerchantOrder(client);
    const merchantOrderId = idPedido;
    try {
      const merchantOrderResponse = await customerClient.get({
        merchantOrderId: merchantOrderId,
      });
      const pedidoGatewayPag =
        merchantOrderResponse as unknown as PedidoGatewayPagamentoDTO;
      this.logger.debug(
        `Merchant order id ${merchantOrderId} consultado com sucesso no Mercado Pago`,
        JSON.stringify(pedidoGatewayPag),
      );
      return pedidoGatewayPag;
    } catch (error) {
      this.logger.error(
        `Erro ao consultar o pedido ${idPedido} no Mercado Pago`,
        error,
      );
    }
  }
}

import { MensagemMercadoPagoDTO } from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';

export interface IWebhookUseCase {
  consumirMensagem(
    id: string,
    topic: string,
    mensagem?: MensagemMercadoPagoDTO,
  ): Promise<any>;
}

export const IWebhookUseCase = Symbol('IWebhookUseCase');

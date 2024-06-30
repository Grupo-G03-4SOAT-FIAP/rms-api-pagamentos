import { NotificacaoMercadoPagoDTO } from 'src/presentation/rest/v1/presenters/pedido/gatewaypag.dto';

export interface IWebhookUseCase {
  consumirMensagem(
    id: string,
    topic: string,
    notificacao?: NotificacaoMercadoPagoDTO,
  ): Promise<any>;
}

export const IWebhookUseCase = Symbol('IWebhookUseCase');

export interface IWebhookUseCase {
  consumirMensagem(id: string, topic: string): Promise<any>;
}

export const IWebhookUseCase = Symbol('IWebhookUseCase');

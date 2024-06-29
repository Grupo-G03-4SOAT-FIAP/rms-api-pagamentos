import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import { CriaPedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';

@Injectable()
export class CobrancaMessageHandler {
  private _nomeFilaCobranca: string;

  constructor(
    private readonly logger: Logger,
    private configService: ConfigService,
    @Inject(IPedidoUseCase)
    private readonly pedidoUseCase: IPedidoUseCase,
  ) {
    this._nomeFilaCobranca = this.configService.getOrThrow<string>(
      'NOME_FILA_NOVA_COBRANCA',
    );
  }

  @SqsMessageHandler('nova-cobranca', false)
  public async handleMessage(message: Message) {
    this.logger.debug(
      `Nova mensagem recebida na fila nova-cobranca`,
      JSON.stringify(message),
    );
    try {
      const parsedBody: any = JSON.parse(message.Body);
      const criaPedidoDTO: CriaPedidoDTO =
        parsedBody as unknown as CriaPedidoDTO;
      await this.pedidoUseCase.criarPedido(criaPedidoDTO);
    } catch (error) {
      this.logger.error(
        `Ocorreu um erro ao processar a mensagem com MessageId ${message?.MessageId}`,
        error,
        JSON.stringify(message),
      );
    }
  }

  @SqsConsumerEventHandler('nova-cobranca', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    this.logger.error(
      `Ocorreu um erro ao processar a mensagem com MessageId ${message?.MessageId}`,
      error,
      JSON.stringify(message),
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService } from '@ssut/nestjs-sqs';
import { IFilaPagamentoConfirmadoAdapter } from 'src/domain/pedido/interfaces/pag_confirmado_adapter';

@Injectable()
export class FilaPagamentoConfirmadoAdapter
  implements IFilaPagamentoConfirmadoAdapter
{
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}
  async publicarPagamentoConfirmado(idPedido: string) {
    const queueName = this.configService.getOrThrow<string>(
      'NOME_FILA_PAGAMENTO_CONFIRMADO',
    );
    try {
      await this.sqsService.send(queueName, {
        id: 'id',
        body: idPedido,
      });
      this.logger.log(
        `Confirmação de pagamento do pedido ${idPedido} publicada na fila ${queueName}`,
      );
    } catch (error) {
      this.logger.error(
        `Ocorreu um erro ao publicar o pedido ${idPedido} na fila ${queueName}`,
        error,
      );
      throw new Error('Ocorreu um erro ao publicar a mensagem.');
    }
  }
}

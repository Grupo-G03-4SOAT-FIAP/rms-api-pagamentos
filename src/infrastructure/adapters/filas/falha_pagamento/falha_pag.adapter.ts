import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService } from '@ssut/nestjs-sqs';
import { IFilaFalhaPagamentoAdapter } from 'src/domain/pedido/interfaces/falha_pag.adapter';

@Injectable()
export class FilaFalhaPagamentoAdapter implements IFilaFalhaPagamentoAdapter {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}
  async publicarFalhaPagamento(idPedido: string) {
    const queueName = this.configService.getOrThrow<string>(
      'NOME_FILA_FALHA_PAGAMENTO',
    );
    try {
      await this.sqsService.send(queueName, {
        id: 'id',
        body: idPedido,
      });
      this.logger.warn(
        `Falha de pagamento no pedido ${idPedido} publicada na fila ${queueName}`,
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

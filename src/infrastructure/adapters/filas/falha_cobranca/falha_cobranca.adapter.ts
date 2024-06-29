import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import { SqsService } from '@ssut/nestjs-sqs';
import { IFilaFalhaCobrancaAdapter } from 'src/domain/pedido/interfaces/falha_cobranca.port';

@Injectable()
export class FilaFalhaCobrancaAdapter implements IFilaFalhaCobrancaAdapter {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}
  async publicarFalhaCobranca(pedidoDTO: PedidoDTO) {
    const queueName = this.configService.getOrThrow<string>(
      'NOME_FILA_FALHA_COBRANCA',
    );
    try {
      await this.sqsService.send(queueName, {
        id: 'id',
        body: pedidoDTO,
      });
      this.logger.log(
        `Pedido ${pedidoDTO.id} publicado na fila ${queueName}`,
        JSON.stringify(pedidoDTO),
      );
    } catch (error) {
      this.logger.error(
        `Ocorreu um erro ao publicar o pedido ${pedidoDTO?.id} na fila ${queueName}`,
        error,
      );
      throw new Error('Ocorreu um erro ao publicar a mensagem.');
    }
  }
}

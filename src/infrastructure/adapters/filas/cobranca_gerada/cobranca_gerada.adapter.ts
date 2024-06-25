import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PedidoDTO } from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';
import { SqsService } from '@ssut/nestjs-sqs';
import { IFilaCobrancaGeradaAdapter } from 'src/domain/pedido/interfaces/cobranca_gerada.port';

@Injectable()
export class FilaCobrancaGeradaAdapter implements IFilaCobrancaGeradaAdapter {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {}
  async publicarCobrancaGerada(pedidoDTO: PedidoDTO) {
    const queueName = this.configService.getOrThrow<string>(
      'NOME_FILA_COBRANCA_GERADA',
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

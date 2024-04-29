import {
  Controller,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IWebhookUseCase } from 'src/domain/pedido/interfaces/webhook.use_case.port';
import { BadRequestError } from '../../helpers/swagger/status-codes/bad_requests.swagger';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('webhook')
@ApiTags('Webhook')
export class WebhookController {
  constructor(
    @Inject(IWebhookUseCase)
    private readonly webhookUseCase: IWebhookUseCase,
  ) {}
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Consumir uma mensagem' })
  @ApiResponse({
    status: 201,
    description: 'Mensagem consumida com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestError,
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido informado não existe',
    type: NotFoundError,
  })
  async consumirMensagem(
    @Query('id') id: string,
    @Query('topic') topic: string,
    //@Body() mensagem: MensagemMercadoPagoDTO,
  ) {
    try {
      return await this.webhookUseCase.consumirMensagem(id, topic);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

import {
  Body,
  Controller,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import { CriaPedidoDTO, PedidoDTO } from '../../presenters/pedido/pedido.dto';
import { BadRequestError } from '../../helpers/swagger/status-codes/bad_requests.swagger';
import { NotFoundError } from '../../helpers/swagger/status-codes/not_found.swagger';

@Controller('pedido')
@ApiTags('Pedido')
export class PedidoController {
  constructor(
    @Inject(IPedidoUseCase)
    private readonly pedidoUseCase: IPedidoUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Checkout de pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso',
    type: PedidoDTO,
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
  async criarPedido(@Body() criaPedidoDTO: CriaPedidoDTO) {
    try {
      return await this.pedidoUseCase.criarPedido(criaPedidoDTO);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

import {
  IsString,
  IsEnum,
  IsDefined,
  IsNotEmpty,
  IsUUID,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemPedidoDTO } from './item_pedido.dto';
import { StatusPedido } from 'src/domain/pedido/enums/pedido.enum';
import { Type } from 'class-transformer';

export class CriaPedidoDTO {
  @IsUUID('4', { message: 'O produto deve ser um UUID válido' })
  @IsNotEmpty({ message: 'UUID do produto não pode ser vazio' })
  @IsDefined({ each: true, message: 'produto não pode ser nulo' })
  @ApiProperty({ description: 'UUID do produto' })
  id: string;

  @IsString({ message: 'O número do pedido deve ser uma string' })
  @IsNotEmpty({ message: 'O número do pedido não pode ser vazio' })
  @IsDefined({ each: true, message: 'O número do pedido não pode ser nulo' })
  @ApiProperty({ description: 'Numero do pedido' })
  numeroPedido: string;

  @IsArray({ message: 'ItensPedido deve ser uma lista' })
  @Type(() => ItemPedidoDTO)
  @IsDefined({ each: true, message: 'O item do pedido não pode ser nulo' })
  @ApiProperty({
    description: 'Lista de produtos',
    isArray: true,
    type: ItemPedidoDTO,
  })
  itensPedido: ItemPedidoDTO[];
}

export class AtualizaPedidoDTO {
  @IsString()
  @IsEnum(StatusPedido)
  @IsDefined({ each: true, message: 'O status do pedido não pode ser nulo' })
  @ApiProperty({ description: 'Status do pedido' })
  statusPedido: StatusPedido;

  @IsOptional()
  @IsBoolean()
  @IsDefined({ each: true, message: 'O status do pagamento não pode ser nulo' })
  @ApiProperty({ description: 'Status do pagamento', required: false })
  pago?: boolean;
}

export class PedidoDTO {
  @ApiProperty({ description: 'ID do pedido' })
  id: string;

  @ApiProperty({ description: 'Numero do pedido' })
  numeroPedido: string;

  @ApiProperty({
    description: 'Itens do pedido',
    type: ItemPedidoDTO,
    isArray: true,
  })
  itensPedido: ItemPedidoDTO[];

  @ApiProperty({ description: 'Status do pedido' })
  statusPedido: string;

  @ApiProperty({ description: 'Status do pagamento' })
  pago: boolean;

  @ApiProperty({ description: 'QR Code para pagamento no formato EMVCo' })
  qrCode: string = null;
}

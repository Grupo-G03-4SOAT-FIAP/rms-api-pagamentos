import {
  IsString,
  IsEnum,
  IsDefined,
  IsNotEmpty,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CriaItemPedidoDTO, ItemPedidoDTO } from './item_pedido.dto';
import { ClienteDTO } from '../cliente/cliente.dto';
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
  @Type(() => CriaItemPedidoDTO)
  @IsDefined({ each: true, message: 'O item do pedido não pode ser nulo' })
  @ApiProperty({
    description: 'Lista de produtos',
    isArray: true,
    type: CriaItemPedidoDTO,
  })
  itensPedido: CriaItemPedidoDTO[];

  @Type(() => ClienteDTO)
  @IsDefined({ each: true, message: 'O cliente não pode ser nulo' })
  @ApiProperty({ description: 'Cliente associado ao pedido', type: ClienteDTO })
  cliente: ClienteDTO;
}

export class AtualizaPedidoDTO {
  @IsString()
  @IsEnum(StatusPedido)
  @IsDefined({ each: true, message: 'O status do pedido não pode ser nulo' })
  @ApiProperty({ description: 'Status do pedido' })
  statusPedido: StatusPedido;
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

  @ApiProperty({ description: 'Data de criação do pedido' })
  criadoEm: string;

  @ApiProperty({ description: 'Data da última atualização do pedido' })
  atualizadoEm: string;

  @ApiProperty({ description: 'Status do pagamento' })
  pago: boolean;

  @ApiProperty({ description: 'Cliente associado ao pedido', type: ClienteDTO })
  cliente: ClienteDTO;

  @ApiProperty({ description: 'QR Code para pagamento no formato EMVCo' })
  qrCode: string = null;
}
function IsInt(arg0: { message: string; }): (target: CriaPedidoDTO, propertyKey: "numeroPedido") => void {
  throw new Error('Function not implemented.');
}

function Min(arg0: number, arg1: { message: string; }): (target: CriaPedidoDTO, propertyKey: "numeroPedido") => void {
  throw new Error('Function not implemented.');
}

function ArrayMinSize(arg0: number, arg1: { message: string; }): (target: CriaPedidoDTO, propertyKey: "itensPedido") => void {
  throw new Error('Function not implemented.');
}

function ValidateNested(arg0: { each: boolean; message: string; }): (target: CriaPedidoDTO, propertyKey: "itensPedido") => void {
  throw new Error('Function not implemented.');
}


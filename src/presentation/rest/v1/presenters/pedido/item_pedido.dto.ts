import { ApiProperty } from '@nestjs/swagger';
import { ProdutoDTO } from '../produto/produto.dto';

export class CriaItemPedidoDTO {
  @ApiProperty({ description: 'ID do item do pedido' })
  id: string;

  @ApiProperty({
    description: 'Produto associado ao item do pedido',
    type: ProdutoDTO,
  })
  produto: ProdutoDTO;

  @ApiProperty({ description: 'Quantidade do produto' })
  quantidade: number;
}

export class ItemPedidoDTO {
  @ApiProperty({ description: 'ID do item do pedido' })
  id: string;

  @ApiProperty({
    description: 'Produto associado ao item do pedido',
    type: ProdutoDTO,
  })
  produto: ProdutoDTO;

  @ApiProperty({ description: 'Quantidade do produto' })
  quantidade: number;
}

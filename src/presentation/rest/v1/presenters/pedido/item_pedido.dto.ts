import { ApiProperty } from '@nestjs/swagger';
import { ProdutoDTO } from '../produto/produto.dto';

export class ItemPedidoDTO {
  @ApiProperty({
    description: 'Produto associado ao item do pedido',
    type: ProdutoDTO,
  })
  produto: ProdutoDTO;

  @ApiProperty({ description: 'Quantidade do produto' })
  quantidade: number;
}

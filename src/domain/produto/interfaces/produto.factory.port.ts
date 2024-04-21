import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoDTO } from 'src/presentation/rest/v1/presenters/produto/produto.dto';

export interface IProdutoFactory {
  criarEntidadeProduto(produto: ProdutoDTO): Promise<ProdutoEntity>;
}

export const IProdutoFactory = Symbol('IProdutoFactory');

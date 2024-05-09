import { ProdutoModel } from './produto.model';

export class CategoriaModel {
  id: string;
  nome: string;
  descricao: string;
  criadoEm: string;
  atualizadoEm: string;
  excluidoEm: string;
  produtos: ProdutoModel[];
}

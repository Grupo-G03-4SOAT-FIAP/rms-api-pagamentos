import { CategoriaModel } from './categoria.model';

export class ProdutoModel {
  id: string;
  nome: string;
  descricao: string;
  valorUnitario: number;
  imagemUrl: string;
  criadoEm: string;
  atualizadoEm: string;
  excluidoEm: string;
  categoria: CategoriaModel;
}

import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';

export class ProdutoEntity {
  private _nome: string;
  private _categoria: CategoriaEntity;
  private _valorUnitario: number;
  private _descricao?: string;
  private _id?: string;

  constructor(
    nome: string,
    categoria: CategoriaEntity,
    valorUnitario: number,
    descricao?: string,
    id?: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
    this.valorUnitario = valorUnitario;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get categoria(): CategoriaEntity {
    return this._categoria;
  }

  set categoria(categoria: CategoriaEntity) {
    this._categoria = categoria;
  }

  get valorUnitario(): number {
    return this._valorUnitario;
  }

  set valorUnitario(valorUnitario: number) {
    this._valorUnitario = valorUnitario;
  }

  get descricao(): string | undefined {
    return this._descricao;
  }

  set descricao(descricao: string | undefined) {
    if (descricao) {
      this._descricao = descricao;
    }
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }
}

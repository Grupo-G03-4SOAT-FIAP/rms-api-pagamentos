export class CategoriaEntity {
  private _nome: string;
  private _descricao?: string;
  private _id?: string;

  constructor(nome: string, descricao?: string, id?: string) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
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

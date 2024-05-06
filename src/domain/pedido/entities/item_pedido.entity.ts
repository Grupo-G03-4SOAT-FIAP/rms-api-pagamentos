import { ProdutoEntity } from 'src/domain/produto/entities/produto.entity';

export class ItemPedidoEntity {
  private _produto: ProdutoEntity;
  private _quantidade: number;

  constructor(produto: ProdutoEntity, quantidade: number) {
    this._produto = produto;
    this._quantidade = quantidade;
  }

  get produto(): ProdutoEntity {
    return this._produto;
  }

  set produto(produto: ProdutoEntity) {
    this._produto = produto;
  }

  get quantidade(): number {
    return this._quantidade;
  }

  set quantidade(quantidade: number) {
    this._quantidade = quantidade;
  }
}

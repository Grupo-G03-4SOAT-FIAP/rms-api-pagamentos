import { Inject, Injectable } from '@nestjs/common';
import { IProdutoFactory } from '../interfaces/produto.factory.port';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { ProdutoDTO } from 'src/presentation/rest/v1/presenters/produto/produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';

@Injectable()
export class ProdutoFactory implements IProdutoFactory {
  constructor(
    @Inject(ICategoriaFactory)
    private readonly categoriaFactory: ICategoriaFactory,
  ) {}
  async criarEntidadeProduto(produto: ProdutoDTO): Promise<ProdutoEntity> {
    let categoriaEntity: CategoriaEntity;
    if (produto.categoria) {
      categoriaEntity = await this.categoriaFactory.criarEntidadeCategoria(
        produto.categoria,
      );
    }

    return new ProdutoEntity(
      produto.nome,
      categoriaEntity,
      produto.valorUnitario,
      produto.descricao,
      produto.id,
    );
  }
}

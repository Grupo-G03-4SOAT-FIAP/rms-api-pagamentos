import { Inject, Injectable } from '@nestjs/common';
import { IProdutoFactory } from '../interfaces/produto.factory.port';
import { ICategoriaRepository } from 'src/domain/categoria/interfaces/categoria.repository.port';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { CategoriaNaoLocalizadaErro } from 'src/domain/categoria/exceptions/categoria.exception';
import {
  AtualizaProdutoDTO,
  CriaProdutoDTO,
  ProdutoDTO,
} from 'src/presentation/rest/v1/presenters/produto/produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';

@Injectable()
export class ProdutoFactory implements IProdutoFactory {
  constructor(
    @Inject(ICategoriaRepository)
    private readonly categoriaRepository: ICategoriaRepository,
  ) { }
  async criarEntidadeCategoria(categoriaId: string): Promise<CategoriaEntity> {
    const categoria =
      await this.categoriaRepository.buscarCategoriaPorId(categoriaId);
    if (!categoria) {
      throw new CategoriaNaoLocalizadaErro('Categoria informada não existe');
    }

    return new CategoriaEntity(
      categoria.nome,
      categoria.descricao,
      categoria.id,
    );
  }

  async criarEntidadeProduto(
    produto: CriaProdutoDTO | AtualizaProdutoDTO,
  ): Promise<ProdutoEntity> {
    const categoriaEntity = await this.criarEntidadeCategoria(
      produto.categoriaId,
    );

    return new ProdutoEntity(
      produto.nome,
      categoriaEntity,
      produto.valorUnitario,
      produto.imagemUrl,
      produto.descricao,
    );
  }

  async criarEntidadeProdutoDeProdutoDTO(
    produto: ProdutoDTO,
  ): Promise<ProdutoEntity> {
    const categoriaEntity = new CategoriaEntity(
      produto.categoria.nome,
      produto.categoria.descricao,
      produto.categoria.id
    );

    return new ProdutoEntity(
      produto.nome,
      categoriaEntity,
      produto.valorUnitario,
      produto.imagemUrl,
      produto.descricao,
      produto.id,
    );
  }
}

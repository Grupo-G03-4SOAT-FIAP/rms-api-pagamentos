import { Injectable } from '@nestjs/common';
import { CategoriaEntity } from 'src/domain/categoria/entities/categoria.entity';
import { ICategoriaFactory } from '../interfaces/categoria.factory.port';
import { CategoriaDTO } from 'src/presentation/rest/v1/presenters/categoria/categoria.dto';

@Injectable()
export class CategoriaFactory implements ICategoriaFactory {
  constructor() {}

  async criarEntidadeCategoria(
    categoria: CategoriaDTO,
  ): Promise<CategoriaEntity> {
    return new CategoriaEntity(
      categoria.nome,
      categoria.descricao,
      categoria.id,
    );
  }
}

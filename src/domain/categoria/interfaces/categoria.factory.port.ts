import { CategoriaDTO } from 'src/presentation/rest/v1/presenters/categoria/categoria.dto';
import { CategoriaEntity } from '../entities/categoria.entity';

export interface ICategoriaFactory {
  criarEntidadeCategoria(categoria: CategoriaDTO): Promise<CategoriaEntity>;
}

export const ICategoriaFactory = Symbol('ICategoriaFactory');

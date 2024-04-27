import { RetornoMP } from 'src/domain/pagamento/entities/retorno_mp.entity';
import { IGenericRepository } from './generic-repository.abstract';
import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';

export abstract class IDataServices {
  abstract pagamento: IGenericRepository<Pagamento>;
  abstract retorno_mp: IGenericRepository<RetornoMP>;
}

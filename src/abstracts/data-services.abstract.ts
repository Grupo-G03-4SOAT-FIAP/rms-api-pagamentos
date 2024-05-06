import { RetornoMPDTO } from 'src/domain/pagamento/interfaces/retorno_mp.dto';
import { IGenericRepository } from './generic-repository.abstract';
import { Pagamento } from 'src/domain/pagamento/entities/pagamento.entity';

export abstract class IDataServices {
  abstract pagamento: IGenericRepository<Pagamento>;
  abstract retorno_mp: IGenericRepository<RetornoMPDTO>;
}

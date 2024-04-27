import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';

import { Pagamento } from './model/pagamento.entity'; //core dto domain
import { PagamentoDocument } from './model/pagamento.entity'; //model entity
import { IDataServices } from 'src/abstracts';
import { RetornoMP, RetornoMPDocument } from './model/retorno_mp.entity';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  pagamento: MongoGenericRepository<Pagamento>;
  retorno_mp: MongoGenericRepository<RetornoMP>;

  constructor(
    @InjectModel(Pagamento.name)
    private PagamentoRepository: Model<PagamentoDocument>,
    @InjectModel(RetornoMP.name)
    private RetornoMPRepository: Model<RetornoMPDocument>,
  ) {}

  onApplicationBootstrap() {
    this.pagamento = new MongoGenericRepository<Pagamento>(
      this.PagamentoRepository,
    );
    this.retorno_mp = new MongoGenericRepository<RetornoMP>(
      this.RetornoMPRepository,
    );
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../abstracts/data-services.abstract';

import { MongoDataServices } from './mongo-data-services.service';
import { Pagamento, PagamentoSchema } from './model/pagamento.entity';
import { RetornoMP, RetornoMPSchema } from './model/retorno_mp.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pagamento.name, schema: PagamentoSchema },
      { name: RetornoMP.name, schema: RetornoMPSchema },
    ]),
    //MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'pagamento' }),
    MongooseModule.forRoot('mongodb://admin:pass@localhost:27017', {
      dbName: 'pagamento',
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}

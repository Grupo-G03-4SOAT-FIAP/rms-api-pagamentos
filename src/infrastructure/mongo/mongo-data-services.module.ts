import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from './abstracts/data-services.abstract';

import { MongoDataServices } from './mongo-data-services.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      //{ name: Payment.name, schema: PaymentSchema },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'fiap' }),
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

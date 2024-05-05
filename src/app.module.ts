import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './presentation/rest/v1/controllers/app/app.controller';
import { AppUseCase } from './application/use_cases/app/app.use_case';
import { PedidoModule } from './modules/pedido.module';
import { WebhookModule } from './modules/webhook.module';

@Module({
  imports: [
    HttpModule,
    PedidoModule,
    WebhookModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   useClass: PostgresConfigService,
    //   inject: [PostgresConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppUseCase],
})
export class AppModule {}

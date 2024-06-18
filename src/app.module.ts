import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PedidoModule } from './modules/pedido.module';
import { WebhookModule } from './modules/webhook.module';
import { HealthModule } from './modules/health.module';

@Module({
  imports: [
    HttpModule,
    HealthModule,
    PedidoModule,
    WebhookModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

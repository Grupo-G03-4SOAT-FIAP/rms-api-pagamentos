import { Logger, Module, forwardRef } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CobrancaMessageHandler } from 'src/infrastructure/message_handlers/cobranca/cobranca.message_handler';
import { PedidoUseCase } from 'src/application/use_cases/pedido/pedido.use_case';
import { IPedidoUseCase } from 'src/domain/pedido/interfaces/pedido.use_case.port';
import { PedidoRepository } from 'src/infrastructure/sql/repositories/pedido/pedido.repository';
import { IPedidoRepository } from 'src/domain/pedido/interfaces/pedido.repository.port';
import { PedidoDTOFactory } from 'src/domain/pedido/factories/pedido.dto.factory';
import { IPedidoDTOFactory } from 'src/domain/pedido/interfaces/pedido.dto.factory.port';
import { PedidoFactory } from 'src/domain/pedido/factories/pedido.factory';
import { IPedidoFactory } from 'src/domain/pedido/interfaces/pedido.factory.port';
import { ProdutoFactory } from 'src/domain/produto/factories/produto.factory';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';
import { CategoriaFactory } from 'src/domain/categoria/factories/categoria.factory';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';
import { GatewayMercadoPagoService } from 'src/infrastructure/adapters/gateway_pagamentos/gatewaypag.service';
import { IGatewayPagamentoService } from 'src/domain/pedido/interfaces/gatewaypag.service.port';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedido.service.port';
import { ApiPedidosService } from 'src/infrastructure/services/api_pedido/apipedido.service';
import { ProdutoDTOFactory } from 'src/domain/produto/factories/produto.dto.factory';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { CategoriaDTOFactory } from 'src/domain/categoria/factories/categoria.dto.factory';
import { ICategoriaDTOFactory } from 'src/domain/categoria/interfaces/categoria.dto.factory.port';
import { MongoDataServicesModule } from 'src/infrastructure/mongo/mongo-data-services.module';
import { SQSClient } from '@aws-sdk/client-sqs';
import { FilaCobrancaGeradaAdapter } from 'src/infrastructure/adapters/filas/cobranca_gerada/cobranca_gerada.adapter';
import { IFilaCobrancaGeradaAdapter } from 'src/domain/pedido/interfaces/cobranca_gerada.port';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          consumers: [
            {
              name: configService.getOrThrow<string>('NOME_FILA_NOVA_COBRANCA'),
              queueUrl: configService.getOrThrow<string>(
                'URL_FILA_NOVA_COBRANCA',
              ),
              region: configService.getOrThrow<string>(
                'REGION_FILA_NOVA_COBRANCA',
              ),
              sqs: new SQSClient({
                region: configService.getOrThrow<string>(
                  'REGION_FILA_NOVA_COBRANCA',
                ),
                endpoint: configService.get<string>(
                  'LOCALSTACK_ENDPOINT',
                ),
              }),
            },
          ],
          producers: [
            {
              name: configService.getOrThrow<string>(
                'NOME_FILA_COBRANCA_GERADA',
              ),
              queueUrl: configService.getOrThrow<string>(
                'URL_FILA_COBRANCA_GERADA',
              ),
              region: configService.getOrThrow<string>(
                'REGION_FILA_COBRANCA_GERADA',
              ),
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => MongoDataServicesModule),
  ],
  controllers: [],
  providers: [
    Logger,
    CobrancaMessageHandler,
    PedidoUseCase,
    {
      provide: IPedidoUseCase,
      useClass: PedidoUseCase,
    },
    PedidoRepository,
    {
      provide: IPedidoRepository,
      useClass: PedidoRepository,
    },
    PedidoDTOFactory,
    {
      provide: IPedidoDTOFactory,
      useClass: PedidoDTOFactory,
    },
    PedidoFactory,
    {
      provide: IPedidoFactory,
      useClass: PedidoFactory,
    },
    ProdutoFactory,
    {
      provide: IProdutoFactory,
      useClass: ProdutoFactory,
    },
    CategoriaFactory,
    {
      provide: ICategoriaFactory,
      useClass: CategoriaFactory,
    },
    GatewayMercadoPagoService,
    {
      provide: IGatewayPagamentoService,
      useClass: GatewayMercadoPagoService,
    },
    ApiPedidosService,
    {
      provide: IApiPedidosService,
      useClass: ApiPedidosService,
    },
    ProdutoDTOFactory,
    {
      provide: IProdutoDTOFactory,
      useClass: ProdutoDTOFactory,
    },
    CategoriaDTOFactory,
    {
      provide: ICategoriaDTOFactory,
      useClass: CategoriaDTOFactory,
    },
    {
      provide: IFilaCobrancaGeradaAdapter,
      useClass: FilaCobrancaGeradaAdapter,
    },
  ],
  exports: [],
})
export class PubSubModule {}

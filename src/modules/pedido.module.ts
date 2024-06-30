import { Logger, Module, forwardRef } from '@nestjs/common';
import { PedidoUseCase } from '../application/use_cases/pedido/pedido.use_case';
import { PedidoDTOFactory } from '../domain/pedido/factories/pedido.dto.factory';
import { PedidoFactory } from '../domain/pedido/factories/pedido.factory';
import { IPedidoDTOFactory } from '../domain/pedido/interfaces/pedido.dto.factory.port';
import { IPedidoFactory } from '../domain/pedido/interfaces/pedido.factory.port';
import { IPedidoRepository } from '../domain/pedido/interfaces/pedido.repository.port';
import { IPedidoUseCase } from '../domain/pedido/interfaces/pedido.use_case.port';
import { PedidoRepository } from '../infrastructure/sql/repositories/pedido/pedido.repository';
import { PedidoController } from '../presentation/rest/v1/controllers/pedido/pedido.controller';
import { IGatewayPagamentoService } from '../domain/pedido/interfaces/gatewaypag.service.port';
import { GatewayMercadoPagoService } from '../infrastructure/services/gateway_pagamentos/gatewaypag.service';
import { IFilaPagamentoConfirmadoAdapter } from 'src/domain/pedido/interfaces/pag_confirmado.adapter';
import { FilaPagamentoConfirmadoAdapter } from 'src/infrastructure/adapters/filas/pagamento_confirmado/pag_confirmado.adapter';
import { ProdutoDTOFactory } from 'src/domain/produto/factories/produto.dto.factory';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { ProdutoFactory } from 'src/domain/produto/factories/produto.factory';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';
import { CategoriaDTOFactory } from 'src/domain/categoria/factories/categoria.dto.factory';
import { ICategoriaDTOFactory } from 'src/domain/categoria/interfaces/categoria.dto.factory.port';
import { CategoriaFactory } from 'src/domain/categoria/factories/categoria.factory';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';
import { MongoDataServicesModule } from 'src/infrastructure/mongo/mongo-data-services.module';
import { FilaCobrancaGeradaAdapter } from 'src/infrastructure/adapters/filas/cobranca_gerada/cobranca_gerada.adapter';
import { IFilaCobrancaGeradaAdapter } from 'src/domain/pedido/interfaces/cobranca_gerada.port';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs';
import { CobrancaMessageHandler } from 'src/infrastructure/message_handlers/nova_cobranca/nova_cobranca.handler';
import { FilaFalhaCobrancaAdapter } from 'src/infrastructure/adapters/filas/falha_cobranca/falha_cobranca.adapter';
import { IFilaFalhaCobrancaAdapter } from 'src/domain/pedido/interfaces/falha_cobranca.port';

@Module({
  imports: [
    forwardRef(() => MongoDataServicesModule),
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
                endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
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
              sqs: new SQSClient({
                region: configService.getOrThrow<string>(
                  'REGION_FILA_COBRANCA_GERADA',
                ),
                endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
              }),
            },
            {
              name: configService.get<string>('NOME_FILA_FALHA_COBRANCA'),
              queueUrl: configService.get<string>('URL_FILA_FALHA_COBRANCA'),
              region: configService.get<string>('REGION_FILA_FALHA_COBRANCA'),
              sqs: new SQSClient({
                region: configService.get<string>('REGION_FILA_FALHA_COBRANCA'),
                endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
              }),
            },
            {
              name: configService.getOrThrow<string>(
                'NOME_FILA_PAGAMENTO_CONFIRMADO',
              ),
              queueUrl: configService.getOrThrow<string>(
                'URL_FILA_PAGAMENTO_CONFIRMADO',
              ),
              region: configService.getOrThrow<string>(
                'REGION_FILA_PAGAMENTO_CONFIRMADO',
              ),
              sqs: new SQSClient({
                region: configService.getOrThrow<string>(
                  'REGION_FILA_PAGAMENTO_CONFIRMADO',
                ),
                endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
              }),
            },
            {
              name: configService.getOrThrow<string>(
                'NOME_FILA_FALHA_PAGAMENTO',
              ),
              queueUrl: configService.getOrThrow<string>(
                'URL_FILA_FALHA_PAGAMENTO',
              ),
              region: configService.getOrThrow<string>(
                'REGION_FILA_FALHA_PAGAMENTO',
              ),
              sqs: new SQSClient({
                region: configService.getOrThrow<string>(
                  'REGION_FILA_FALHA_PAGAMENTO',
                ),
                endpoint: configService.get<string>('LOCALSTACK_ENDPOINT'),
              }),
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [PedidoController],
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
    FilaPagamentoConfirmadoAdapter,
    {
      provide: IFilaPagamentoConfirmadoAdapter,
      useClass: FilaPagamentoConfirmadoAdapter,
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
    FilaCobrancaGeradaAdapter,
    {
      provide: IFilaCobrancaGeradaAdapter,
      useClass: FilaCobrancaGeradaAdapter,
    },
    FilaFalhaCobrancaAdapter,
    {
      provide: IFilaFalhaCobrancaAdapter,
      useClass: FilaFalhaCobrancaAdapter,
    },
  ],
  exports: [],
})
export class PedidoModule {}

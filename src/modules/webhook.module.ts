import { Module, forwardRef } from '@nestjs/common';
import { PedidoDTOFactory } from '../domain/pedido/factories/pedido.dto.factory';
import { PedidoFactory } from '../domain/pedido/factories/pedido.factory';
import { IPedidoDTOFactory } from '../domain/pedido/interfaces/pedido.dto.factory.port';
import { IPedidoFactory } from '../domain/pedido/interfaces/pedido.factory.port';
import { IPedidoRepository } from '../domain/pedido/interfaces/pedido.repository.port';
import { PedidoRepository } from '../infrastructure/sql/repositories/pedido/pedido.repository';
import { IGatewayPagamentoService } from '../domain/pedido/interfaces/gatewaypag.service.port';
import { GatewayMercadoPagoService } from '../infrastructure/services/gateway_pagamentos/gatewaypag.service';
import { SQLDTOFactory } from '../infrastructure/sql/factories/sql.dto.factory';
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import { ApiPedidosService } from 'src/infrastructure/services/api_pedidos/apipedidos.service';
import { WebhookController } from 'src/presentation/rest/v1/controllers/webhook/webhook.controller';
import { ProdutoDTOFactory } from 'src/domain/produto/factories/produto.dto.factory';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { ProdutoFactory } from 'src/domain/produto/factories/produto.factory';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';
import { CategoriaDTOFactory } from 'src/domain/categoria/factories/categoria.dto.factory';
import { ICategoriaDTOFactory } from 'src/domain/categoria/interfaces/categoria.dto.factory.port';
import { WebhookUseCase } from 'src/application/use_cases/webhook/webhook.use_case';
import { IWebhookUseCase } from 'src/domain/pedido/interfaces/webhook.use_case.port';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';
import { CategoriaFactory } from 'src/domain/categoria/factories/categoria.factory';
import { MongoDataServicesModule } from 'src/infrastructure/mongo/mongo-data-services.module';

@Module({
  controllers: [WebhookController],
  imports: [forwardRef(() => MongoDataServicesModule)],
  providers: [
    WebhookUseCase,
    {
      provide: IWebhookUseCase,
      useClass: WebhookUseCase,
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
    ProdutoFactory,
    {
      provide: IProdutoFactory,
      useClass: ProdutoFactory,
    },
    CategoriaDTOFactory,
    {
      provide: ICategoriaDTOFactory,
      useClass: CategoriaDTOFactory,
    },
    SQLDTOFactory,
  ],
  exports: [],
})
export class WebhookModule {}

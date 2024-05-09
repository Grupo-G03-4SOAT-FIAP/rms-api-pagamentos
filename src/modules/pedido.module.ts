import { Module, forwardRef } from '@nestjs/common';
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
import { IApiPedidosService } from 'src/domain/pedido/interfaces/apipedidos.service.port';
import { ApiPedidosService } from 'src/infrastructure/services/api_pedidos/apipedidos.service';
import { ProdutoDTOFactory } from 'src/domain/produto/factories/produto.dto.factory';
import { IProdutoDTOFactory } from 'src/domain/produto/interfaces/produto.dto.factory.port';
import { ProdutoFactory } from 'src/domain/produto/factories/produto.factory';
import { IProdutoFactory } from 'src/domain/produto/interfaces/produto.factory.port';
import { CategoriaDTOFactory } from 'src/domain/categoria/factories/categoria.dto.factory';
import { ICategoriaDTOFactory } from 'src/domain/categoria/interfaces/categoria.dto.factory.port';
import { CategoriaFactory } from 'src/domain/categoria/factories/categoria.factory';
import { ICategoriaFactory } from 'src/domain/categoria/interfaces/categoria.factory.port';
import { MongoDataServicesModule } from 'src/infrastructure/mongo/mongo-data-services.module';

@Module({
  controllers: [PedidoController],
  imports: [forwardRef(() => MongoDataServicesModule)],
  providers: [
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
  ],
  exports: [],
})
export class PedidoModule {}

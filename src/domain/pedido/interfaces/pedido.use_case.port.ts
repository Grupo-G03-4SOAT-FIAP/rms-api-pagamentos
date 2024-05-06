import { HTTPResponse } from 'src/application/common/HTTPResponse';
import {
  CriaPedidoDTO,
  PedidoDTO,
} from 'src/presentation/rest/v1/presenters/pedido/pedido.dto';

export interface IPedidoUseCase {
  criarPedido(criaPedidoDTO: CriaPedidoDTO): Promise<HTTPResponse<PedidoDTO>>;
}

export const IPedidoUseCase = Symbol('IPedidoUseCase');

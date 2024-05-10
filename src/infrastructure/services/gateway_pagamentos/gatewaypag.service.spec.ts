import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GatewayMercadoPagoService } from './gatewaypag.service';
import {
  configServiceMock,
  mercadoPagoResponseMock,
  pedidoEntityMock,
} from 'src/mocks/pedido.mock';

describe('GatewayMercadoPagoService', () => {
  let gatewayMercadoPagoService: GatewayMercadoPagoService;
  let qrData: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewayMercadoPagoService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    gatewayMercadoPagoService = module.get<GatewayMercadoPagoService>(
      GatewayMercadoPagoService,
    );
    qrData =
      '00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um pedido no mercado pago', async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({
      data: mercadoPagoResponseMock,
    });

    const result =
      await gatewayMercadoPagoService.criarPedido(pedidoEntityMock);

    expect(result).toStrictEqual(qrData);
  });
});

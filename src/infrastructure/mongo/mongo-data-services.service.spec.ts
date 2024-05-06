import { Model } from 'mongoose';
import { MongoDataServices } from './mongo-data-services.service';
import { PagamentoDocument } from './model/pagamento.entity'; // Importe os modelos Pagamento e RetornoMP
import { RetornoMPDocument } from './model/retorno_mp.entity'; // Importe os modelos Pagamento e RetornoMP

describe('MongoDataServices', () => {
  let mongoDataServices: MongoDataServices;
  let pagamentoRepository: Model<PagamentoDocument>; // Defina o tipo do modelo como Pagamento
  let retornoMPRepository: Model<RetornoMPDocument>; // Defina o tipo do modelo como RetornoMP

  beforeEach(() => {
    pagamentoRepository = {} as Model<PagamentoDocument>; // Inicialize o modelo com o tipo Pagamento
    retornoMPRepository = {} as Model<RetornoMPDocument>; // Inicialize o modelo com o tipo RetornoMP
    mongoDataServices = new MongoDataServices(
      pagamentoRepository,
      retornoMPRepository,
    );
  });

  it('should create', () => {
    expect(mongoDataServices).toBeDefined();
  });
});

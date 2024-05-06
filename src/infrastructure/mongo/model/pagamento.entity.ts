import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PagamentoDocument = HydratedDocument<Pagamento>;

@Schema()
export class Pagamento {
  @Prop()
  id_pedido: string;
  @Prop()
  qr_data: string;
  @Prop()
  date: string;
}

export const PagamentoSchema = SchemaFactory.createForClass(Pagamento);

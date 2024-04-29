import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RetornoMPDocument = HydratedDocument<RetornoMP>;

@Schema()
export class RetornoMP {
  @Prop()
  id: string;
  @Prop()
  topic: string;
}

export const RetornoMPSchema = SchemaFactory.createForClass(RetornoMP);

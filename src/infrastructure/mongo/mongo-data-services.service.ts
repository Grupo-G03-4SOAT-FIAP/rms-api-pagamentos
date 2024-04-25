import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from './abstracts/data-services.abstract';
import { MongoGenericRepository } from './mongo-generic-repository';

import { Payment } from ''; //core dto domain
import { PaymentDocument } from ''; //model entity

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  payment: MongoGenericRepository<Payment>;

  constructor(
    @InjectModel(Payment.name)
    private PaymentRepository: Model<PaymentDocument>,
  ) {}

  onApplicationBootstrap() {
    this.payment = new MongoGenericRepository<Payment>(this.PaymentRepository);
  }
}

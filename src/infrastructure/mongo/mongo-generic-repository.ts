import { Model } from 'mongoose';
import { IGenericRepository } from '../../abstracts/generic-repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: any;

  constructor(repository: Model<T>, populateOnFind?: any) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  // patchById(id: string, newStatus: T): Promise<T> {
  //   return this._repository
  //     .findByIdAndUpdate(id, {
  //       $push: {
  //         status_pedido: newStatus,
  //       },
  //     })
  //     .exec();
  // }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  getByFilter(filter: Record<string, any>): Promise<T[]> {
    return this._repository
      .find(filter, {})
      .populate(this._populateOnFind)
      .exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  createMany(item: T[]): any {
    return this._repository.insertMany(item);
  }

  deleteById(id: number): Promise<T> {
    return this._repository.findByIdAndDelete(id).exec();
  }

  updateById(id: number, item: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, item).exec();
  }
}

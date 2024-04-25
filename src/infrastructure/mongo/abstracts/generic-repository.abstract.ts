export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    abstract create(item: T): Promise<T>;
    abstract createMany(item: T[]): any;
    abstract getByFilter(filter: Record<string, any>): Promise<T[]>;
    abstract deleteById(id: number): Promise<T>
    abstract updateById(id: number, item: T): Promise<T>
    //abstract patchById(id: string, newStatus: any):any
  
}

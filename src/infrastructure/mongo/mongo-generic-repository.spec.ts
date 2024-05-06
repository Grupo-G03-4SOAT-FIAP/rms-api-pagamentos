import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';

describe('MongoGenericRepository', () => {
  let repository: MongoGenericRepository<any>;
  let mockModel: Model<any>;

  beforeEach(() => {
    mockModel = {
      find: jest.fn(),
      populate: jest.fn(),
      create: jest.fn(),
      insertMany: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      getByFilter: jest.fn(),
    } as any;

    repository = new MongoGenericRepository(mockModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve obter todos os itens', async () => {
    const mockItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    (mockModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockItems),
      }),
    });

    const result = await repository.getAll();

    expect(result).toEqual(mockItems);
    expect(mockModel.find).toHaveBeenCalledWith();
  });

  it('deve obter itens por filtro', async () => {
    const filter = { name: 'Item' };
    const mockItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    (mockModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockItems),
      }),
    });

    const result = await repository.getByFilter(filter);

    expect(result).toEqual(mockItems);
    expect(mockModel.find).toHaveBeenCalledWith(filter, {});
  });

  it('deve criar um item', async () => {
    const newItem = { id: 1, name: 'Item 1' };
    (mockModel.create as jest.Mock).mockResolvedValue(newItem);

    const result = await repository.create(newItem);

    expect(result).toEqual(newItem);
    expect(mockModel.create).toHaveBeenCalledWith(newItem);
  });

  it('deve criar vários itens', async () => {
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const insertedItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    (mockModel.insertMany as jest.Mock).mockResolvedValue(insertedItems);

    const result = await repository.createMany(items);

    expect(result).toEqual(insertedItems);
    expect(mockModel.insertMany).toHaveBeenCalledWith(items);
  });

  it('deve deletar um item por ID', async () => {
    const itemId = 1;
    const deletedItem = { id: 1, name: 'Item 1' };

    (mockModel.findByIdAndDelete as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(deletedItem),
    });

    const result = await repository.deleteById(itemId);

    expect(result).toEqual(deletedItem);
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(itemId);
  });

  it('deve atualizar um item por ID', async () => {
    const itemId = 1;
    const updatedItem = { id: 1, name: 'Updated Item 1' };

    (mockModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedItem),
    });

    const result = await repository.updateById(itemId, updatedItem);

    expect(result).toEqual(updatedItem);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      itemId,
      updatedItem,
    );
  });
});

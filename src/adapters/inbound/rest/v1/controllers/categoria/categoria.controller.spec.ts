import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaController } from './categoria.controller';
import { ICategoriaUseCase } from '../../../../../../domain/ports/categoria/categoria.use_case.port';
import {
  AtualizaCategoriaDTO,
  CategoriaDTO,
  CriaCategoriaDTO,
} from '../../presenters/categoria.dto';
import {
  CategoriaDuplicadaErro,
  CategoriaNaoLocalizadaErro,
} from '../../../../../../domain/exceptions/categoria.exception';

const novaCategoriaDTO = new CriaCategoriaDTO();
novaCategoriaDTO.nome = 'Nova categoria';
novaCategoriaDTO.descricao = 'Nova descrição';

describe('Categoria', () => {
  let categoriaController: CategoriaController;
  let categoriaUserCase: ICategoriaUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaController],
      providers: [
        {
          provide: ICategoriaUseCase,
          useValue: {
            criarCategoria: jest.fn(),
            editarCategoria: jest.fn(),
            excluirCategoria: jest.fn(),
            buscarCategoria: jest.fn(),
            listarCategorias: jest.fn(),
          },
        },
      ],
    }).compile();
    categoriaController = module.get<CategoriaController>(CategoriaController);
    categoriaUserCase = module.get<ICategoriaUseCase>(ICategoriaUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve ter uma definição para Categoria Controller e Categoria Use Case', async () => {
    expect(categoriaController).toBeDefined();
    expect(categoriaUserCase).toBeDefined();
  });

  describe('Criar categoria', () => {
    it('Deve ser retornado uma exception se ocorrer um erro para criar uma categoria', async () => {
      jest
        .spyOn(categoriaUserCase, 'criarCategoria')
        .mockRejectedValue(new Error());
      expect(categoriaController.criar(novaCategoriaDTO)).rejects.toThrow();
    });

    it('Deve ser retornado uma exception ao tentar criar uma categoria duplicada', async () => {
      jest
        .spyOn(categoriaUserCase, 'criarCategoria')
        .mockRejectedValue(
          new CategoriaDuplicadaErro('Existe uma categoria com esse nome'),
        );
      expect(categoriaController.criar(novaCategoriaDTO)).rejects.toThrow(
        new CategoriaDuplicadaErro('Existe uma categoria com esse nome'),
      );
    });

    it('Deve ser possível criar uma nova categoria', async () => {
      const categoriaDTO = new CategoriaDTO();
      categoriaDTO.id = '0a14aa4e-75e7-405f-8301-81f60646c93c';
      categoriaDTO.nome = novaCategoriaDTO.nome;
      categoriaDTO.descricao = novaCategoriaDTO.descricao;
      jest.spyOn(categoriaUserCase, 'criarCategoria').mockReturnValue(
        Promise.resolve({
          mensagem: 'Categoria criada com sucesso',
          body: categoriaDTO,
        }),
      );
      const novaCategoria = await categoriaController.criar(novaCategoriaDTO);
      expect(novaCategoria).toEqual({
        mensagem: 'Categoria criada com sucesso',
        body: categoriaDTO,
      });
    });
  });

  describe('Atualizar Categoria', () => {
    it('Deve ser retornada uma exception ao tentar atualizar o nome da categoria com o mesmo de uma categoria já existente', async () => {
      jest
        .spyOn(categoriaUserCase, 'editarCategoria')
        .mockRejectedValue(
          new CategoriaDuplicadaErro('Existe uma categoria com esse nome'),
        );
      expect(
        categoriaController.atualizar(
          '0a14aa4e-75e7-405f-8301-81f60646c93c',
          novaCategoriaDTO,
        ),
      ).rejects.toThrow(
        new CategoriaDuplicadaErro('Existe uma categoria com esse nome'),
      );
    });

    it('Deve ser retornada uma exception ao tentar atualizar uma categoria não existente', async () => {
      jest
        .spyOn(categoriaUserCase, 'editarCategoria')
        .mockRejectedValue(
          new CategoriaNaoLocalizadaErro('Categoria informada não existe'),
        );
      expect(
        categoriaController.atualizar(
          '0a14aa4e-75e7-405f-8301-81f60646c93c',
          novaCategoriaDTO,
        ),
      ).rejects.toThrow(
        new CategoriaNaoLocalizadaErro('Categoria informada não existe'),
      );
    });

    it('Deve ser retornada uma exception em caso de erros para atualizar uma categoria', async () => {
      jest
        .spyOn(categoriaUserCase, 'editarCategoria')
        .mockRejectedValue(new Error());
      expect(
        categoriaController.atualizar(
          '0a14aa4e-75e7-405f-8301-81f60646c93c',
          novaCategoriaDTO,
        ),
      ).rejects.toThrow(new Error());
    });

    it('Deve ser possível atualizar uma categoria', async () => {
      const categoriaEditada = new CategoriaDTO();
      categoriaEditada.nome = 'Nome Categoria Editada';
      categoriaEditada.descricao = 'Descrição Categoria Editada';
      jest.spyOn(categoriaUserCase, 'editarCategoria').mockReturnValue(
        Promise.resolve({
          mensagem: 'Categoria atualizada com sucesso',
          body: categoriaEditada,
        }),
      );
      const categoriaAtualizar = new AtualizaCategoriaDTO();
      expect(
        categoriaController.atualizar(
          '0a14aa4e-75e7-405f-8301-81f60646c93c',
          categoriaAtualizar,
        ),
      ).toStrictEqual(
        Promise.resolve({
          mensagem: 'Categoria atualizada com ucesso',
          body: categoriaEditada,
        }),
      );
    });
  });
});

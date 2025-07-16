import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBook = { id: 1, title: 'Test Book' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockBook),
            findAll: jest.fn().mockResolvedValue({ data: [mockBook], total: 1 }),
            findOne: jest.fn().mockResolvedValue(mockBook),
            update: jest.fn().mockResolvedValue(mockBook),
            softDelete: jest.fn().mockResolvedValue(undefined),
            exportCsv: jest.fn().mockResolvedValue('id,title\n1,Test Book\n'),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });


  it('should find all books', async () => {
    const result = await controller.findAll();
    expect(result).toEqual({ data: [mockBook], total: 1 });
  });

  it('should find one book', async () => {
    expect(await controller.findOne(1)).toEqual(mockBook);
  });

  it('should update a book', async () => {
    expect(await controller.update(1, { title: 'Updated' })).toEqual(mockBook);
  });

  it('should soft delete a book', async () => {
    expect(await controller.softDelete(1)).toBeUndefined();
  });
});

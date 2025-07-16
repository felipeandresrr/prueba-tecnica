import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { Repository } from 'typeorm';

const mockBook:Book = {
  id: 1,
  title: 'Test Book',
  author: 'Author',
  editorial: 'Editorial',
  price: 100,
  availability: true,
  genre: 'Genre',
  imageurl: 'url',
};

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockResolvedValue(mockBook),
            findOneBy: jest.fn().mockResolvedValue(mockBook),
            update: jest.fn().mockResolvedValue(undefined),
            softDelete: jest.fn().mockResolvedValue(undefined),
            find: jest.fn().mockResolvedValue([mockBook]),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getManyAndCount: jest.fn().mockResolvedValue([[mockBook], 1]),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should create a book', async () => {
    const dto = { ...mockBook } as Book;
    const book = await service.create(dto);
    expect(book).toEqual(mockBook);
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should find all books', async () => {
    const result = await service.findAll({}, 0, 10);
    expect(result.data).toEqual([mockBook]);
    expect(result.total).toBe(1);
  });

  it('should find one book', async () => {
    const book = await service.findOne(1);
    expect(book).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const dto = { title: 'Updated' };
    await service.update(1, dto);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
  });

  it('should soft delete a book', async () => {
    await service.softDelete(1);
    expect(repo.softDelete).toHaveBeenCalledWith(1);
  });
});

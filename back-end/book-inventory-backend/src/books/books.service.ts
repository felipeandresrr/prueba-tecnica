import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as csvStringify from 'csv-stringify/sync';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { Book } from './books.entity';
import { Parser } from 'json2csv';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = this.repo.create(dto);
    return this.repo.save(book);
  }

  async findAll(
    search = '',
    page = 1,
    take = 10,
    sortField: any = 'title',
    sortDirection: 'asc' | 'desc' = 'asc',
  ): Promise<{ data: Book[]; total: number }> {
  
    const skip = (page - 1) * take;
  
    const allowedFields: (keyof Book)[] = ['title', 'author', 'editorial', 'genre', 'price', 'availability'];
  
    const query = this.repo.createQueryBuilder('book')
      .where('book.deletedat IS NULL'); // si usas soft delete
  
    // Validar campo sort
    if (allowedFields.includes(sortField)) {
      query.orderBy(`book.${sortField}`, sortDirection.toUpperCase() as 'ASC' | 'DESC');
    } else {
      query.orderBy('book.title', 'ASC');
    }
  
    // Filtro search solo si tiene texto
    if (search.trim().length > 0) {
      const searchParam = `%${search.toLowerCase()}%`;
  
      const whereExpr = [
        'LOWER(book.title) LIKE :search',
        'LOWER(book.author) LIKE :search',
        'LOWER(book.editorial) LIKE :search',
        'LOWER(book.genre) LIKE :search',
        'CAST(book.price AS TEXT) LIKE :search',
        `LOWER(CASE WHEN book.availability THEN 'disponible' ELSE 'no disponible' END) LIKE :search`
      ].join(' OR ');
  
      query.andWhere(`(${whereExpr})`, { search: searchParam });
    }
  
    query.skip(skip).take(take);
  
    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }
  
  

  async findOne(id: number): Promise<Book> {
    const book = await this.repo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  async findAllForExport(): Promise<Book[]> {
    return this.repo.find();
  }
  
  async convertToCsv(books: Book[]): Promise<string> {
    const parser = new Parser({ fields: ['title', 'author', 'editorial', 'price', 'availability', 'genre'] });
    return parser.parse(books);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body, Query, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'sortField', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  async findAll(
    @Query('search') search?: string,
    @Query('skip') skip = '0',
    @Query('take') take = '10',
    @Query('sortField') sortField = 'title',
    @Query('sortDirection') sortDirection: 'asc' | 'desc' = 'asc',
  ) {
    return this.booksService.findAll(search, +skip, +take, sortField, sortDirection);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.softDelete(id);
  }

  @Get('export/csv')
  @ApiOperation({ summary: 'Exportar libros a CSV' })
  async exportCsv(@Res() res: Response) {
    const books = await this.booksService.findAllForExport();
    const csv = await this.booksService.convertToCsv(books);
    res.header('Content-Type', 'text/csv');
    res.attachment('books.csv');
    res.send(csv);
  }
}

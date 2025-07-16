import { IsString, IsNumber, IsBoolean, IsOptional, isNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'El Quijote' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Miguel de Cervantes' })
  @IsString()
  author: string;

  @ApiPropertyOptional({ example: 'Editorial ABC' })
  @IsString()
  editorial: string;

  @ApiProperty({ example: 15990 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  availability: boolean;

  @ApiPropertyOptional({ example: 'Clásico' })
  @IsString()
  genre: string;

  @ApiPropertyOptional({ example: 'http://...' })
  @IsOptional()
  @IsString()
  imageurl?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  id?:  number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  deletedat?:Date;

}

  
  export class UpdateBookDto extends PartialType(CreateBookDto) {}

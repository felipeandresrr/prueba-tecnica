import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  editorial: string;

  @Column('decimal')
  price: number;

  @Column()
  availability: boolean;

  @Column()
  genre: string;

  @Column({ nullable: true })
  imageurl?: string;

  @DeleteDateColumn()
  deletedat?: Date;
}

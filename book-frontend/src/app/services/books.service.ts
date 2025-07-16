import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient, private authService: AuthService) {}

getBooks(
  page: number,
  limit: number,
  filters: any,
  sortField: string,
  sortDirection: string
) {
  const params: any = {
    skip: page,
    take: limit,
    sortField,
    sortDirection,
    ...filters
  };

  return this.http.get<{ data: Book[], total: number }>(this.api, { params });
}

  

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.api, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.api}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  exportCsv(){
    return this.http.get(this.api +"/export/csv", {
      responseType: 'text'
    });

    
  }
}

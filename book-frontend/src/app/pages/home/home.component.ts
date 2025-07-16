import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { Book } from '../../interfaces/book.interface';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  bookForm: FormGroup;

  books: Book[] = [];

  genres = ['Novela', 'Realismo Mágico', 'Misterio'];
  editorials = [];
  authors = [];

  formOpen = false;
  selectedBook: Book | null = null;

  // PAGINACIÓN
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  totalItems = 0;

  // ORDENAMIENTO
  sortField: keyof Book = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';

  private searchSub?: Subscription;

  // FILTROS
  filters: any = {
    search: ''
  };

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router
  ) {
    this.filterForm = this.fb.group({
      search: [''],
    });

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      editorial: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      genre: ['', Validators.required],
      availability: [false],
      imageurl: [''],
    });
  }

  ngOnInit() {
    this.loadBooks();

    this.searchSub = this.filterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        this.filters.search = this.filterForm.get('search')?.value || '';
        this.currentPage = 1;
        this.loadBooks();
      });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  loadBooks() {
    this.booksService
      .getBooks(this.currentPage, this.itemsPerPage, this.filters, this.sortField, this.sortDirection)
      .subscribe((res: { data: Book[]; total: number }) => {
        this.books = res.data;
        this.totalItems = res.total;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) || 1;
      });
  }

  sortBy(field: keyof Book) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadBooks();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  openForm(book?: Book) {
    if (book) {
      this.selectedBook = book;
      this.bookForm.patchValue(book);
    } else {
      this.selectedBook = null;
      this.bookForm.reset({ availability: false, price: '' });
    }
    this.formOpen = true;
  }

  closeForm() {
    this.formOpen = false;
    this.selectedBook = null;
  }

  saveBook() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.bookForm.value, price: Number(this.bookForm.value.price) };
    delete formValue.id;
    delete formValue.deletedat;

    if (this.selectedBook) {
      // Editar
      const updatedBook = { ...this.selectedBook, ...formValue };
      this.booksService.updateBook(updatedBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeForm();
        },
        error: () => alert('Error actualizando libro')
      });
    } else {
      // Crear
      this.booksService.createBook(formValue).subscribe({
        next: () => {
          this.loadBooks();
          this.closeForm();
        },
        error: () => alert('Error creando libro')
      });
    }
  }

  deleteBook(bookId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.booksService.deleteBook(bookId).subscribe({
        next: () => {
          alert('Libro eliminado correctamente');
          this.loadBooks();
        },
        error: () => alert('Ocurrió un error al eliminar el libro')
      });
    }
  }

  exportarCsv(){
    this.booksService.exportCsv().subscribe(
      {
        next: (res) => {
          console.log("res", res);
          const blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blob);
      
          const a = document.createElement('a');
          a.href = url;
          a.download = 'books.csv';
          a.click();
      
          window.URL.revokeObjectURL(url);
        },
        error: (error) => console.log("error", error)
      }
    )
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.bookForm.patchValue({ imageurl: e.target?.result });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      alert('Sesión cerrada, inicia nuevamente');
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }
}

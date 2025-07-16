export interface Book {
    id: number;
    title: string;
    author: string;
    editorial: string;
    price: string; // o number, depende si viene como string del backend
    availability: boolean;
    genre: string;
    imageurl: string;
  }
  
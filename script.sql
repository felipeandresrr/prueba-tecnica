CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  editorial VARCHAR,
  price DECIMAL,
  availability BOOLEAN,
  genre VARCHAR,
  image_url VARCHAR,
  deleted_at TIMESTAMP
);


INSERT INTO users (email, password)
VALUES
('felipe.recabarren.r@gmail.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8yYPYFfy4sYXQGeTfJjvVh3L6Y8e4G'), 

INSERT INTO books (title, author, editorial, price, availability, genre, imageUrl)
VALUES
('El Quijote', 'Miguel de Cervantes', 'Editorial A', 15000, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg'),
('Cien Años de Soledad', 'Gabriel García Márquez', 'Editorial B', 20000, true, 'Realismo Mágico', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgsUCPHp3SOTsijY_tNLp8zOiGxJCUZ0yEA&s'),
('La Sombra del Viento', 'Carlos Ruiz Zafón', 'Editorial C', 18000, false, 'Misterio', 'https://images.cdn2.buscalibre.com/fit-in/360x360/4a/f8/4af862174ba709db62744f988c62e3b6.jpg'),
('Sub Terra', 'Baldomero Lillo', 'Editorial Zig-Zag', 12000, true, 'Realismo', 'https://images.cdn1.buscalibre.com/fit-in/360x360/8d/0c/8d0c5641d919a03b630f84322d5efc2c.jpg'),
('El obsceno pájaro de la noche', 'José Donoso', 'Editorial Alfaguara', 18500, true, 'Realismo Mágico', 'https://images.cdn1.buscalibre.com/fit-in/360x360/3a/64/3a64c95b84c7c84bd0c9e8ecb4f5c4ad.jpg'),
('La Casa de los Espíritus', 'Isabel Allende', 'Editorial Sudamericana', 19500, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/5e/4b/5e4bfb5dc2cf65f1dc5fa02a8d91ffeb.jpg'),
('El Guardián entre el Centeno', 'J.D. Salinger', 'Editorial EDAF', 13000, false, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/7f/0a/7f0a4405e5e7559b06a2e89b6a744fa8.jpg'),
('Rayuela', 'Julio Cortázar', 'Editorial C', 17000, true, 'Novela', 'https://images.cdn2.buscalibre.com/fit-in/360x360/19/bc/19bc2bfc0a3596ff72fb4f25e0e4be94.jpg'),
('Pedro Páramo', 'Juan Rulfo', 'Editorial B', 14000, true, 'Realismo Mágico', 'https://images.cdn2.buscalibre.com/fit-in/360x360/65/5d/655d481c61115ec295f2c9db07d591b6.jpg'),
('El Túnel', 'Ernesto Sábato', 'Editorial Planeta', 12500, true, 'Misterio', 'https://images.cdn1.buscalibre.com/fit-in/360x360/7a/4a/7a4a2c44b0b575a67b3a3b7f9b2f4b6c.jpg'),
('Martín Rivas', 'Alberto Blest Gana', 'Editorial Zig-Zag', 11000, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/67/df/67df1bbf67eac2b39e3b54b9cf2d80a3.jpg'),
('Don Segundo Sombra', 'Ricardo Güiraldes', 'Editorial Sudamericana', 16000, false, 'Novela', 'https://images.cdn2.buscalibre.com/fit-in/360x360/8a/27/8a27ea8161cf97dc0b1819b7358126d1.jpg'),
('El Aleph', 'Jorge Luis Borges', 'Editorial Emecé', 15500, true, 'Cuento', 'https://images.cdn1.buscalibre.com/fit-in/360x360/84/13/841374a78546452c0d2c9c9b69a0c93d.jpg'),
('Palomita Blanca', 'Enrique Lafourcade', 'Editorial Alfaguara', 12000, false, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/37/0e/370e52aa09a4448ad64e56611f7b84db.jpg'),
('El Principito', 'Antoine de Saint-Exupéry', 'Editorial Salamandra', 10000, true, 'Fábula', 'https://images.cdn2.buscalibre.com/fit-in/360x360/0b/3d/0b3dce5d4ee1c3ee66b505faafbd6b69.jpg'),
('Los Detectives Salvajes', 'Roberto Bolaño', 'Editorial Alfaguara', 21000, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/2a/60/2a609a10caa638d914b6a42c9f36b764.jpg'),
('2666', 'Roberto Bolaño', 'Editorial Alfaguara', 23000, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/90/f5/90f5f49d5f3c229560c52485a9b53ce1.jpg'),
('La Vorágine', 'José Eustasio Rivera', 'Editorial B', 14000, false, 'Novela', 'https://images.cdn2.buscalibre.com/fit-in/360x360/50/f3/50f37e35283cd8b67f52c16e491061b8.jpg'),
('Aura', 'Carlos Fuentes', 'Editorial C', 13500, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/69/3a/693a302afed0c1a8f38509d3933c315e.jpg'),
('Confieso que he vivido', 'Pablo Neruda', 'Editorial Seix Barral', 18000, true, 'Memorias', 'https://images.cdn1.buscalibre.com/fit-in/360x360/07/90/07909e6b54a9ac0ed05ed755b14c791e.jpg'),
('El amor en los tiempos del cólera', 'Gabriel García Márquez', 'Editorial Sudamericana', 19000, true, 'Novela', 'https://images.cdn1.buscalibre.com/fit-in/360x360/92/6f/926f1662b4ce8b063a492819e93915c0.jpg'),
('Santa María de las Flores Negras', 'Hernán Rivera Letelier', 'Editorial Alfaguara', 15000, true, 'Novela', 'https://images.cdn2.buscalibre.com/fit-in/360x360/4f/c7/4fc77235dcf9432253d5f82ab83b124c.jpg'),
('Fatamorgana de Amor con Banda de Música', 'Hernán Rivera Letelier', 'Editorial Alfaguara', 15500, true, 'Novela', 'https://images.cdn2.buscalibre.com/fit-in/360x360/70/91/7091771e7da7b3718c4c65f5e7b3ce1a.jpg'),
('Sum', 'David Eagleman', 'Editorial Anagrama', 12500, true, 'Filosofía', 'https://images.cdn2.buscalibre.com/fit-in/360x360/4d/64/4d64ac19f932064290b34555d176e3fa.jpg'),
('Fahrenheit 451', 'Ray Bradbury', 'Editorial Minotauro', 16000, true, 'Ciencia Ficción', 'https://images.cdn1.buscalibre.com/fit-in/360x360/f9/e3/f9e33a14280b35809fb42ea8cb48a0a4.jpg');


SELECT * FROM users;

SELECT * FROM books;
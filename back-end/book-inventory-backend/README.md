# 📦 Backend - API de Gestión de Libros (NestJS + TypeScript)

Este proyecto es una API backend desarrollada con NestJS y TypeScript para la gestión de un inventario de libros. Está diseñada con arquitectura modular y escalable, siguiendo principios SOLID.

---

## 🚀 Características principales

- Arquitectura modular y escalable basada en principios SOLID.
- Sistema de autenticación mediante JWT.
- Endpoints RESTful para operaciones CRUD sobre libros.
- Endpoints adicionales para exportar datos en formato CSV.
- Implementación de soft delete para eliminar registros sin pérdida definitiva.
- Sistema de logging para auditoría y seguimiento de operaciones.

---

## 🛠️ Tecnologías usadas

- [NestJS](https://nestjs.com/) (framework backend)
- [TypeScript](https://www.typescriptlang.org/)
- JSON Web Tokens (JWT) para autenticación
- [class-validator](https://github.com/typestack/class-validator) para validación de datos
- [Winston](https://github.com/winstonjs/winston) o similar para logging
- Otros módulos NestJS para manejo de bases de datos y utilidades

---

## 📋 Funcionalidades

### Autenticación

- Registro y login con JWT.
- Protección de rutas para usuarios autenticados.

### Gestión de Libros

- Crear, leer, actualizar y eliminar libros (CRUD).
- Soft delete: los registros eliminados quedan marcados pero no borrados físicamente.
- Listar libros con paginación y filtros (según implementación).

### Exportación

- Endpoint para exportar listado de libros en formato CSV.

### Auditoría y Logging

- Registro de operaciones CRUD para fines de auditoría.
- Logs configurados para registrar errores y eventos importantes.

---

## 📦 Estructura de módulos (ejemplo)
src/
├── auth/ # Módulo de autenticación JWT
├── books/ # Módulo para gestión de libros (CRUD + exportación)
├── common/ # Utilidades comunes, DTOs, pipes, filtros
├── logging/ # Configuración y servicios de logging
└── main.ts # Archivo principal de arranque de la app

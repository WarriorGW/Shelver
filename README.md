# Proyecto de Universidad

Este es un proyecto que elaboré durante el noveno cuatrimestre de la Universidad Tecnológica de Aguascalientes. Durante el año 2025

# Requerimientos

[████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 30%

## Repositorio

- [x] Tener versionamiento en algun repositorio

## Base

- [x] Tener HTTPS
- [x] Tener roles (Administradores y usuarios)

## Inicio de sesion y registro

- Contraseña con requisitos:
  - [x] Longitud mínima de 8 caracteres
  - [x] Utilizar mínimo una mayúscula
  - [x] Utilizar mínimo una minúscula
  - [x] Utilizar mínimo un carácter especial
  - [x] No permitir números consecutivos (ej. 1234)
  - [x] No permitir letras consecutivas (ej. abcd)
- [ ] Recuperar contraseña
- [ ] Autenticación de doble factor (email)
- [ ] Cuidar inyección de código (Si lo logra, tenemos 0)
- [ ] Actualización de información de usuario (Nombre, Foto, Contraseña, Etc)

## Manejo de sesiones

- [ ] No poder tener mas de una sesión activa
- [ ] Se tienen 3 intentos para iniciar sesión, si se supera son 3 minutos de bloqueo de cuenta
- [ ] La sesión se debe de cerrar automáticamente después de 15 minutos cuando el usuario no ha interactuado con el sistema

## Administración

- Catálogo de usuarios
  - [x] Editar usuario (Nombre, rol)
  - [x] Bloquear y desbloquear usuario
  - [x] Deshabilitar y habilitar usuario
  - [ ] Buscar por Id, Nombre, Email
  - [ ] Ordenar por Nombre, Email, Rol, Estado
  - [ ] Filtrar por Nombre, Email, Rol, Estado
  - [ ] Deshabilitar columnas
  - [ ] Paginacion
- [ ] Catalogo unico (Disponibilidad de libros)
  - [ ] Registro de libros disponibles
  - [ ] Actualizacion de los libros disponibles
  - [ ] Borrado de libros para libros ya no disponibles
- [ ] Catalogo maestro/detalle (Prestamo de libros Usuario/Libro)
  - [ ] Registro de nuevos prestamos por usuario
  - [ ] Actualizacion de los libros prestados
  - [ ] Borrado de prestamos completados

## API's

- [x] Consumo de algun API de un tercero
- [x] Implementar una API propia para que un tercero use

## Protección de datos

- [ ] Incluir aviso de privacidad de los datos (Casilla en registro)
- [ ] Concentimiento de autorizacion de manejo de datos
- [ ] Incluir posibilidad de rechazar autorizacion de manejo de datos

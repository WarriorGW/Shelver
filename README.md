# Proyecto de Universidad

Este es un proyecto que elaboré durante el noveno cuatrimestre de la Universidad Tecnológica de Aguascalientes. Durante el año 2025

# Requerimientos

[████████████████████████████████████████████░░░░░░░░░░░░░░] 69%

## Repositorio

- [x] Tener versionamiento en algun repositorio

## Base

- [x] Tener HTTPS
- [x] Tener roles (Administradores y usuarios)

## Pagina principal

- [x] Mostrar todos los libros que se tienen disponibles
- [x] Mostrar detalles de los libros
- [x] Dar opcion para apartar los libros

## Inicio de sesion y registro

- [x] Contraseña con requisitos:
  - [x] Longitud mínima de 8 caracteres
  - [x] Utilizar mínimo una mayúscula
  - [x] Utilizar mínimo una minúscula
  - [x] Utilizar mínimo un carácter especial
  - [x] No permitir números consecutivos (ej. 1234)
  - [x] No permitir letras consecutivas (ej. abcd)
- [ ] Recuperar contraseña
- [ ] Autenticación de doble factor (email)
- [x] Cuidar inyección de código (Si lo logra, tenemos 0)
- [x] Actualización de información de usuario (Nombre, Foto, Contraseña, Etc)

## Manejo de sesiones

- [ ] No poder tener mas de una sesión activa
- [ ] Se tienen 3 intentos para iniciar sesión, si se supera son 3 minutos de bloqueo de cuenta
- [ ] La sesión se debe de cerrar automáticamente después de 15 minutos cuando el usuario no ha interactuado con el sistema

## Administración

- [x] Catálogo de usuarios
  - [x] Editar usuario (Nombre, rol)
  - [x] Bloquear y desbloquear usuario
  - [x] Deshabilitar y habilitar usuario
  - [ ] Buscar por Id, Nombre, Email
  - [x] Ordenar por Nombre, Email, Rol, Estado
  - [ ] Deshabilitar columnas
- [x] Catalogo unico (Disponibilidad de libros)
  - [x] Registro de libros disponibles
  - [x] Actualizacion de los libros disponibles
  - [x] Borrado de libros para libros ya no disponibles
- [x] Catalogo maestro/detalle (Prestamo de libros Usuario/Libro)
  - [x] Registro de nuevos prestamos por usuario
  - [x] Actualizacion de los libros prestados
  - [x] Borrado de prestamos completados

## API's

- [x] Consumo de algun API de un tercero
- [x] Implementar una API propia para que un tercero use

## Protección de datos

- [x] Incluir aviso de privacidad de los datos (Casilla en registro)
- [x] Concentimiento de autorizacion de manejo de datos
- [x] Incluir posibilidad de rechazar autorizacion de manejo de datos

# Requerimientos de la rubrica

- [x] Aplicacion publicada y funcionando
- [x] Ventana de acceso (Login)
- [x] Registro de usuarios
- [x] Validaciones de la contrasena
- [ ] Envio de correo para confirmar y activar usuario
- [ ] Opcion de recuperacion de contrasena
- [x] Repositorio funcionando
- [x] SSL funcionando
- [x] Consumo de un API de terceros
- [x] API propia funcionando
- [x] Catalogo de usuarios, Registro/Actualizacion/Borrado
- [x] Catalogo de roles, Registro/Actualizacion/Borrado
- [x] Modulo de asignacion de roles a usuarios
- [x] Catalogo unico, Registro/Actualizacion/Borrado
- [x] Catalogo maestro/detalle, Registro/Actualizacion/Borrado

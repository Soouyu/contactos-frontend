## Sistema de Gestion de Contactos - Frontend

Aplicacion web en Next.js que consume la api de contactos. Esta misma permite iniciar sesioin y gestionar contactos con el crud completo (crear,listar,buscar,editar y eliminar).

## Tecnologias Usadas
- Next.js (App router) con TypeScript
- CSS propio con su hoja de estilos separada
- fecth para consumir la api

## Requisitos previos

- Node.js 18 o superior
- El backend debe estar corriendo en http://localhost:8080

## Como Correr el proyecto

1.- Instalar dependencias con:
 npm install

2.- Levantar la Aplicacion
npm run dev

3.- Abrir http://localhost:3000

## Credenciales de prueba

- Usuario: admin
- Clave: admin123

## Funcionalidades
- Login con jwt ( este token se guarda con el navegador)
- LIstado de contactos
- Crear, Editar y eliminar contactos (crud completo)
- Busqueda por nombre
- Etiqueta por contactos
- Validaciones (campos obligatorios, formato del correo, telefono solo con numeros)


## Desiciones Tecnologicas
- Next.js con app router: 
Use la estructura de las carpetas de next donde cada carpeta es una ruta como login,contactos que es la forma moderna y la que exige la prueba que se haga.

- TypeScript:
Lo utilize por el tipado que maneja,que ayuda a detectar errores antes y deja mucho mas sencillo la forma que tienen los datos ( como el tipo de contacto)

- Fetch directo:
Decidi consumir la api con fecth porque es el enfoque directo y mas entendible para una app de este tamano.

- Estado con useState:
Manejo el estado del formulario y la lista con useState, sin librerias extras, porque la app no necesitaba un manejo de estados complejos a mi parecer.

- CSS propio:
Use una hoja de estilos propia, para mantener el proyecto lo mas simple y tener un control directo de los estilos.

- Catalogo de etiquetas:
Las categorias (Familia,Amigos,etc) tome la desicion de que esten fijas en el frontend porque son pocas; y las etiquetas asignadas van a cada contacto.

## PC
<img width="1600" height="874" alt="image" src="https://github.com/user-attachments/assets/6140a00c-4482-4728-b952-9a034ce42e1d" />

## MOBIL 

<img width="1375" height="957" alt="image" src="https://github.com/user-attachments/assets/d9164e6f-7c30-49e6-bd99-aa7eacd2394d" />


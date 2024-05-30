# Documentación de la Aplicación de Contenidos

### Descripción de la Aplicación:

Esta aplicación de backend está diseñada para registrar usuarios y gestionar elementos proporcionados por ellos. Implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y maneja tres roles distintos:

- Administrador:

Tiene privilegios completos sobre todos los datos almacenados en el sistema.
Puede crear, editar y eliminar cualquier contenido.

- Usuario Creador:

Puede crear y editar el contenido que él mismo ha creado.
No tiene permisos para crear tópicos ni eliminar contenido.

- Usuario Lector:

Solo tiene permisos para revisar todo el contenido y las categorías creadas por la aplicación.
La aplicación sigue el patrón de diseño Modelo Vista Controlador (MVC) para mantener una estructura de código limpia y modular.

La validación y creación de usuarios se manejan a través de middlewares que utilizan la librería JWT para garantizar la seguridad y autenticidad.


## Instalación
Por favor, sigue estos pasos para instalar y ejecutar la aplicación.

<details>
  <summary>Usando npm</summary>

  1. Clona el repositorio:
     ```bash
     git clone https://github.com/tankez0r/disruptive-challenge-backend.git
     ```

  2. Navega al directorio del proyecto:
     ```bash
     cd disruptive-challenge-backend
     ```

  3. Instala las dependencias utilizando npm:
     ```bash
     npm install
     ```

</details>

<details>
  <summary>Usando yarn</summary>

  1. Clona el repositorio:
     ```bash
    git clone https://github.com/tankez0r/disruptive-challenge-backend.git
     ```

  2. Navega al directorio del proyecto:
     ```bash
     cd disruptive-challenge-backend
     ```

  3. Instala las dependencias utilizando yarn:
     ```bash
     yarn install
     ```

</details>

## Uso

Para usar la aplicación, ejecuta el siguiente comando:

Para npm:
```bash
npm run start
```

Para yarn:
```bash
yarn start
```

## Funcionalidades

- **Crear contenidos:** El usuario puede crear contenidos que se almacenan en una base de datos, estos tienen una logica de CRUD.
- **Crear Topico:** El usuario administrador tiene los permisos para crear, editar y borrar los mismos.
- **Crear usuario:** La capacidad de gestionar la creación, y logueo de cuentas a la app. 


## Dependencias

La aplicación cuenta con las siguientes librerías:

- express
- jose
- mongoose
- cors
- Typescript
- bcrypt
- dotenv
- body-parse

## Colección de llamados postman

dentro del repositorio tambien se encuentra un archivo tipo JSON llamado Local Api que sirve para exportar a la herramienta local de peticiones como soporte para entender como se hacen
todos los llamados posibles a la aplicación, teniendo cada una las variables correspondientes en sus argumentos ya sea para crear usuarios, contenido, modificar contenido, o borrar topicos.
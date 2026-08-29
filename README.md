# Vehicle GraphQL

API desarrollada con **NestJS**, **GraphQL**, **TypeORM** y **MySQL**.

El proyecto implementa un CRUD de vehículos, incluyendo tipos de vehículos mediante un enum, eliminación lógica (*soft delete*) y búsqueda de vehículos.

## Tecnologías

* **NestJS**
* **GraphQL**
* **TypeORM**
* **MySQL**
* **TypeScript**

## Funcionalidades

Actualmente la API permite:

* Crear vehículos.
* Listar todos los vehículos.
* Obtener un vehículo por ID.
* Actualizar vehículos.
* Realizar eliminación lógica de vehículos.
* Buscar vehículos.
* Utilizar tipos de vehículos mediante un enum.
* Persistir la información en MySQL mediante TypeORM.

## Tipos de vehículos

Los vehículos pueden tener uno de los siguientes tipos:

```graphql
enum VehicleType {
  SEDAN
  SUV
  PICKUP
  COUPE
  HATCHBACK
  MOTORCYCLE
}
```

## Estructura del proyecto

```text
src/
└── vehicles/
    ├── dto/
    │   ├── create-vehicle.input.ts
    │   └── update-vehicle.input.ts
    │
    ├── entities/
    │   └── vehicle.entity.ts
    │
    ├── enums/
    │   └── vehicle-type.enum.ts
    │
    ├── types/
    │   └── vehicle.type.ts
    │
    ├── vehicles.module.ts
    ├── vehicles.resolver.ts
    └── vehicles.service.ts
```

### Arquitectura

La aplicación utiliza una arquitectura sencilla basada en capas:

```text
GraphQL
   │
   ▼
Resolver
   │
   ▼
Service
   │
   ▼
TypeORM Repository
   │
   ▼
MySQL
```

Los tipos utilizados por GraphQL y las entidades utilizadas para la base de datos se mantienen separados:

```text
Vehicle
   │
   └── Representación de GraphQL

VehicleEntity
   │
   └── Representación de la base de datos
```

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* MySQL

## Instalación

Instalar las dependencias del proyecto:

```bash
npm install
```

## Variables de entorno

Configurar las credenciales de conexión a MySQL mediante variables de entorno.

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=vehicles
```

Modificar los valores según la configuración local.

## Base de datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE vehicles;
```

La aplicación utiliza TypeORM para administrar la tabla `vehicles`.

Durante el desarrollo, TypeORM puede sincronizar automáticamente la estructura de las entidades con la base de datos cuando `synchronize` está habilitado.

> `synchronize: true` resulta práctico durante el desarrollo, pero debe utilizarse con precaución en entornos de producción.

## Ejecutar la aplicación

Para iniciar la aplicación en modo desarrollo:

```bash
npm run start:dev
```

Una vez iniciada, la aplicación expondrá la API GraphQL.

## GraphQL

Una vez que la aplicación esté ejecutándose, se puede acceder a la interfaz GraphQL configurada en el proyecto y ejecutar las siguientes operaciones.

### Obtener todos los vehículos

```graphql
query {
  vehicles {
    id
    licensePlate
    brand
    model
    year
    color
    type
    active
  }
}
```

### Obtener un vehículo por ID

```graphql
query {
  vehicle(id: 1) {
    id
    licensePlate
    brand
    model
    year
    color
    type
    active
  }
}
```

### Buscar vehículos

La búsqueda permite encontrar coincidencias parciales y no distingue entre mayúsculas y minúsculas.

La búsqueda se realiza sobre:

* Patente (`licensePlate`)
* Marca (`brand`)
* Modelo (`model`)
* Color (`color`)

Ejemplo:

```graphql
query {
  searchVehicles(search: "toy") {
    id
    licensePlate
    brand
    model
    year
    color
    type
    active
  }
}
```

Esto puede devolver, por ejemplo:

```text
Toyota Corolla
Toyota Hilux
```

La búsqueda tampoco distingue entre mayúsculas y minúsculas:

```graphql
query {
  searchVehicles(search: "TOYOTA") {
    id
    brand
    model
  }
}
```

Una búsqueda vacía devuelve una lista vacía:

```graphql
query {
  searchVehicles(search: "") {
    id
    brand
    model
  }
}
```

## Crear un vehículo

```graphql
mutation {
  createVehicle(
    input: {
      licensePlate: "AB123CD"
      brand: "Toyota"
      model: "Corolla"
      year: 2024
      color: "White"
      type: SEDAN
    }
  ) {
    id
    licensePlate
    brand
    model
    year
    color
    type
    active
  }
}
```

El `id` es generado automáticamente por MySQL.

Los nuevos vehículos se crean inicialmente como activos:

```text
active: true
```

## Actualizar un vehículo

La actualización permite modificar solamente los campos enviados.

Por ejemplo:

```graphql
mutation {
  updateVehicle(
    id: 1
    input: {
      color: "Red"
      type: SUV
    }
  ) {
    id
    licensePlate
    brand
    model
    year
    color
    type
    active
  }
}
```

## Eliminar un vehículo

La aplicación utiliza **eliminación lógica (soft delete)**.

En lugar de eliminar físicamente el registro de la base de datos, el vehículo se marca como inactivo:

```graphql
mutation {
  deleteVehicle(id: 1)
}
```

El registro continúa existiendo en MySQL, pero pasa a tener:

```text
active: false
```

Esto permite conservar la información del vehículo.

## API GraphQL actual

### Queries

```text
vehicles()
vehicle(id)
searchVehicles(search)
```

### Mutations

```text
createVehicle(input)
updateVehicle(id, input)
deleteVehicle(id)
```

## Modelo de vehículo

| Campo          | Tipo        | Descripción                       |
| -------------- | ----------- | --------------------------------- |
| `id`           | ID          | Identificador único               |
| `licensePlate` | String      | Patente del vehículo              |
| `brand`        | String      | Marca del vehículo                |
| `model`        | String      | Modelo del vehículo               |
| `year`         | Int         | Año del vehículo                  |
| `color`        | String      | Color del vehículo                |
| `type`         | VehicleType | Tipo de vehículo                  |
| `active`       | Boolean     | Indica si el vehículo está activo |

## Desarrollo

Iniciar la aplicación en modo desarrollo:

```bash
npm run start:dev
```

# Instalación

```bash
npm install	
```

## Crea la base una base de datos y ejecuta el siguiente código

```sql
create table emails (
	"id" serial not null primary key,
	"emisor" varchar(100),
	"receptor" varchar(100),
	"estado" int default 0, --- -1=eliminado | 0=borrador | 1=enviado
	"leido" boolean default true,
	"asunto" varchar(200),
	"extrainfo" varchar(255) default null, 
	"contenido" text,
	"fecha" timestamp default CURRENT_DATE
);

create table categorias(
	"id" serial not null primary key,
	"nombre" varchar(100),
	"value" int default 2
)
```

## Modifica el archivo de configuración de la conexión a la base de datos

El archivo se llama `connect.js` la linea `3`

````javascript
let sequelize = new Sequelize('databaseName', 'postgres', 'passwordPostgresql',  { host: 'localhost', dialect: 'postgres' });

````

 ### Inicia el servidor

`````bas
npm start
`````

Si todo ha ido bien no te debe salir error

## Indicaciones

1. Al iniciar sesión para hacer las pruebas, en el campo ``Nombre Usuario` ingresa un email válido y obligatoriamente debes seleccionar una imagen con formato `JPG`
2. Crea las categorías con nombre `Docentes` y `Estudiantes` , si te equivocas en alguna te va a tocar eliminar directo en la base de datos
3. Prueba los botones de las acciones (Pepelera, Eliminar, Categoria) con solo un correo


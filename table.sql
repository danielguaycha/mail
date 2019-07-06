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
import * as pg from "pg";

export default new pg.Pool({ connectionString: process.env.DATABASE_URL });

/*

create table users
(
    id       serial       not null,
    email    varchar(255) not null,
    password varchar(255) not null
);

alter table users
    owner to postgres;

create unique index users_email_uindex
    on users (email);

create unique index users_id_uindex
    on users (id);

*/

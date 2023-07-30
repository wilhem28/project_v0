CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE DATABASE authentication;

-- DROP DATABASE IF EXISTS authentication;

CREATE DATABASE authentication
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'French_France.1252'
    LC_CTYPE = 'French_France.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- CREATE TABLE users (
--     user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_name VARCHAR(100) NOT NULL,
--     user_email VARCHAR(100) NOT NULL UNIQUE,
--     user_password VARCHAR(255) NOT NULL,
--     user_privileges BOOLEAN DEFAULT false,
--     user_genre VARCHAR(20) NULL,
--     user_dob DATE NULL,
--     user_city VARCHAR(60) NULL,
--     user_img VARCHAR(100) NULL
-- );

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL DEFAULT 'uuid_generate_v4()',
    user_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_privileges boolean DEFAULT 'false',
    user_genre character varying(20) COLLATE pg_catalog."default",
    user_dob date,
    user_city character varying(60) COLLATE pg_catalog."default",
    user_img character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_user_email_key UNIQUE (user_email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id_product uuid NOT NULL DEFAULT 'uuid_generate_v4()',
    fk_user uuid NULL,
    store_product character varying(50) COLLATE pg_catalog."default" NOT NULL,
    place_product character varying(50) COLLATE pg_catalog."default" NOT NULL,
    branch_product character varying(50) COLLATE pg_catalog."default" NOT NULL,
    brand_product character varying(50) COLLATE pg_catalog."default" NOT NULL,
    range_product character varying(50) COLLATE pg_catalog."default" NOT NULL,
    type_product character varying(50) COLLATE pg_catalog."default" NULL,
    packaging_product character varying(20) COLLATE pg_catalog."default" NOT NULL,
    volume_product character varying(10) COLLATE pg_catalog."default" NOT NULL,
    quantity_product smallint NOT NULL,
    price_product numeric NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id_product),
    CONSTRAINT foreign_key_user FOREIGN KEY (id_product)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

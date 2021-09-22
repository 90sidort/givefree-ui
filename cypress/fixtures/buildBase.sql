DROP DATABASE IF EXISTS givefree_db;
CREATE DATABASE givefree_db;

START TRANSACTION
SELECT * FROM current_schema()
SELECT * FROM current_database()
SELECT "table_schema", "table_name" FROM "information_schema"."tables" WHERE ("table_schema" = 'public' AND "table_name" = 'image') OR ("table_schema" = 'public' AND "table_name" = 'user') OR ("table_schema" = 'public' AND "table_name" = 'item') OR ("table_schema" = 'public' AND "table_name" = 'item_wishers_user')
SELECT * FROM current_schema()
SELECT * FROM "information_schema"."tables" WHERE "table_schema" = 'public' AND "table_name" = 'typeorm_metadata'
SELECT * FROM current_schema()
CREATE TABLE "image" ("id" SERIAL NOT NULL, "alt" character varying(400) NOT NULL DEFAULT 'image', "url" character varying NOT NULL, "itemId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))
CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(200) NOT NULL, "name" character varying(200) NOT NULL, "surname" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "about" character varying(2000), "phone_number" character varying(2000), "active" boolean NOT NULL DEFAULT true, "reset" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))
SELECT * FROM current_schema()
SELECT "n"."nspname", "t"."typname" FROM "pg_type" "t" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'item_status_enum'
SELECT * FROM current_schema()
SELECT "n"."nspname", "t"."typname" FROM "pg_type" "t" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'item_state_enum'
SELECT * FROM current_schema()
SELECT "n"."nspname", "t"."typname" FROM "pg_type" "t" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" = 'public' AND "t"."typname" = 'item_category_enum'
CREATE TYPE "item_status_enum" AS ENUM('draft', 'given', 'ongoing')
CREATE TYPE "item_state_enum" AS ENUM('new', 'good', 'decent', 'broken')
CREATE TYPE "item_category_enum" AS ENUM('other', 't-shirt', 'sweatshirt', 'trousers', 'hoodie', 'dress', 'polo', 'jacket', 'coat', 'jeans', 'socks', 'shorts')
CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying(400) NOT NULL, "active" boolean NOT NULL DEFAULT true, "status" "item_status_enum" NOT NULL DEFAULT 'ongoing', "state" "item_state_enum" NOT NULL DEFAULT 'good', "category" "item_category_enum" NOT NULL, "description" character varying(600), "giverId" integer NOT NULL, "takerId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))
CREATE TABLE "item_wishers_user" ("itemId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_54d900c36b24d1bb34545620241" PRIMARY KEY ("itemId", "userId"))
CREATE INDEX "IDX_14bb59ea588b714353c9beb365" ON "item_wishers_user" ("itemId") 
CREATE INDEX "IDX_110670ad23893468c761f8a762" ON "item_wishers_user" ("userId") 
ALTER TABLE "image" ADD CONSTRAINT "FK_bc27afe227e84a1091a35988244" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE "item" ADD CONSTRAINT "FK_949bb80540c769982344aec8f45" FOREIGN KEY ("giverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "item" ADD CONSTRAINT "FK_50642166601af714135e0284519" FOREIGN KEY ("takerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "item_wishers_user" ADD CONSTRAINT "FK_14bb59ea588b714353c9beb365d" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "item_wishers_user" ADD CONSTRAINT "FK_110670ad23893468c761f8a762e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
COMMIT
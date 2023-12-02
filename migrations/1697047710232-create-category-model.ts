import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryModel1697047710232 implements MigrationInterface {
    name = 'CreateCategoryModel1697047710232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."category_gender_enum" AS ENUM('men', 'women', 'kid')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying, "gender" "public"."category_gender_enum" NOT NULL DEFAULT 'men', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "public"."category_gender_enum"`);
    }

}

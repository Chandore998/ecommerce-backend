import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubcategoryModel1697305784586 implements MigrationInterface {
    name = 'CreateSubcategoryModel1697305784586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_58ac195f4b1005721f6e844daee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subCategory" ADD CONSTRAINT "FK_e84f5e6499f4f3e12aef86d6c3f" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subCategory" DROP CONSTRAINT "FK_e84f5e6499f4f3e12aef86d6c3f"`);
        await queryRunner.query(`DROP TABLE "subCategory"`);
    }
}

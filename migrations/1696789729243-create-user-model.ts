import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserModel1696789729243 implements MigrationInterface {
    name = 'CreateUserModel1696789729243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "deviceType" character varying, "deviceToken" character varying, "dob" integer, "profileImage" character varying, "notiSale" boolean NOT NULL DEFAULT true, "notiNewArrival" boolean NOT NULL DEFAULT true, "notiDelivStatusChanges" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

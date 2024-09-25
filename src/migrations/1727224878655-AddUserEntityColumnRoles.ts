import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntityColumnRoles1727224878655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       ` ALTER TABLE "user" ADD roles ENUM ('customer', 'admin') DEFAULT 'customer';`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

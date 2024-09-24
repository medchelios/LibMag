import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntityColumn1727220145150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
           ` ALTER TABLE "user" ADD mobile VARCHAR(255), ADD address VARCHAR(255);`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientTable1618951852316 implements MigrationInterface {
  name = 'CreateClientTable1618951852316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "client" (
        "id" SERIAL NOT NULL,
        "email" character varying NOT NULL,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        CONSTRAINT "uq" UNIQUE ("email"),
        CONSTRAINT "pk" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "client"`);
  }
}

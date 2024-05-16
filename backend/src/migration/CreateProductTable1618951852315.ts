import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1618951852315 implements MigrationInterface {
  name = 'CreateProductTable1618951852315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "price" integer NOT NULL,
        "invoiceId" integer,
        CONSTRAINT "pk_product" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "product" ADD CONSTRAINT "fk_product" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_79d389c8a8e0268c711dff0a0b6"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}

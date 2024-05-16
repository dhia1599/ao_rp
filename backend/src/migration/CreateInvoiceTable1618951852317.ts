import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoiceTable1618951852317 implements MigrationInterface {
  name = 'CreateInvoiceTable1618951852317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "invoice" (
      "id" SERIAL NOT NULL,
      "price" integer NOT NULL,
      "contact" character varying NOT NULL,
      "clientId" integer,
      CONSTRAINT "pk_invoice" PRIMARY KEY ("id")
    )
    `);
    await queryRunner.query(`
      ALTER TABLE "invoice" ADD CONSTRAINT "fk_invoice" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_496a24c3cc42fe97c0206f6ee46"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
  }
}

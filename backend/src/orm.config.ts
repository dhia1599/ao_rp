import { DataSource, DataSourceOptions, getConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entity/user.entity';
import { CreateUser1678018200391 } from './migration/1678018200391-CreateUser';
import { Client } from './entity/client.entity';
import { Invoice } from './entity/invoice.entity';
import { Product } from './entity/product.entity';

dotenv.config();

const OrmDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || '',
  port: Number(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  synchronize: false,
  entities: [User, Client, Invoice, Product],
  migrations: ["dist/migrations/*{.ts,.js}"],
  logging: false,
  name: 'default'
};

export const OrmDataSource = new DataSource(OrmDataSourceOptions);

// async function addEntitiesToDatabase() {
//   // Get a connection to the database
//   const connection = getConnection('');

//   // Create a new client
//   const newClient = new Client();
//   newClient.email = 'client@example.com';
//   newClient.firstName = 'John';
//   newClient.lastName = 'Doe';

//   // Save the client to the database
//   const savedClient = await connection.manager.save(newClient);

//   // Create a new invoice
//   const newInvoice = new Invoice();
//   newInvoice.price = 100;
//   newInvoice.contact = 'invoice@example.com';
//   newInvoice.client = savedClient;

//   // Save the invoice to the database
//   const savedInvoice = await connection.manager.save(newInvoice);

//   // Create products and add them to the invoice
//   const product1 = new Product();
//   product1.name = 'Product 1';
//   product1.price = 50;
//   product1.invoice = savedInvoice;

//   const product2 = new Product();
//   product2.name = 'Product 2';
//   product2.price = 75;
//   product2.invoice = savedInvoice;

//   // Save products to the database
//   await connection.manager.save([product1, product2]);

//   console.log('Entities added to the database successfully!');
// }

// // Call the function to add entities to the database
// addEntitiesToDatabase();


import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from 'dotenv';

config();

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;

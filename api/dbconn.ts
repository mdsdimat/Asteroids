import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export function mongoConnect(): void {
  mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

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

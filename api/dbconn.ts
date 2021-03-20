import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export function mongoConnect(): void {
  mongoose.connect('mongodb://root:example@mongo:27017/', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .catch(console.warn);
}

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'newPassword',
  database: 'asteroids',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;

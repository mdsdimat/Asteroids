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
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'newPassword',
  database: 'asteroids',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;

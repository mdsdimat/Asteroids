import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull, Sequelize, SequelizeOptions,
} from 'sequelize-typescript';
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

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'theme',
})
class ThemeModel extends Model<ThemeModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
}

sequelize.addModels([ThemeModel]);

(async () => {
  console.log('asdasdasd');
  try {
    const data = await ThemeModel.findAll();

    data.forEach(item => {
      console.log(item);
    })

    //console.log(data);
  } catch(error) {
    console.log(error);
  }
  //console.log(data);
})();

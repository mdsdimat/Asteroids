import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull,
} from 'sequelize-typescript';

import sequelize from '../dbconn';

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

export { ThemeModel };

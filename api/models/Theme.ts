import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull, Unique,
} from 'sequelize-typescript';

import sequelize from '../dbconn';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'theme',
  underscored: true,
})
class Theme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  params: string;
}

sequelize.addModels([Theme]);

export default Theme;

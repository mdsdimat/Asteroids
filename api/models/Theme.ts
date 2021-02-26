import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull, Unique,
} from 'sequelize-typescript';

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

  @Column(DataType.STRING)
  params: string;
}

export default Theme;

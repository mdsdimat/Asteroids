import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull, ForeignKey, BelongsTo,
} from 'sequelize-typescript';

import Theme from './Theme';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
  underscored: true,
})
class UserTheme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Theme)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'theme_id',
  })
  theme_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => Theme)
  theme: Theme;
}

export default UserTheme;

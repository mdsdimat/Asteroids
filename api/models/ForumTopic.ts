import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'forum_topic',
  underscored: true,
})
class ForumTopic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;
}

export default ForumTopic;

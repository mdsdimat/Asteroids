import {
  Model, Table, DataType, AutoIncrement, PrimaryKey, Column, AllowNull,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'forum_post',
  underscored: true,
})
class ForumPost extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  message: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  topic_id: number;
}

export default ForumPost;

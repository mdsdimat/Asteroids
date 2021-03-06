import sequelize from '../dbconn';
import Theme from './Theme';
import UserTheme from './UserTheme';

import ForumTopic from './ForumTopic';
import ForumPost from './ForumPost';

sequelize.addModels([Theme, UserTheme, ForumTopic, ForumPost]);

Theme.hasMany(UserTheme);
UserTheme.belongsTo(Theme);

export default sequelize;
export { Theme, UserTheme, ForumTopic, ForumPost };

import sequelize from './dbconn';
import Theme from './models/Theme';
import UserTheme from './models/UserTheme';
import ForumPost from './models/ForumPost';
import ForumTopic from './models/ForumTopic';

sequelize.addModels([Theme, UserTheme, ForumPost, ForumTopic]);

(async () => {
  await sequelize.sync({ force: true });
  await Theme.create({ name: 'light' });
  await Theme.create({ name: 'dark' });

  console.log('All models were synchronized successfully.');
})();

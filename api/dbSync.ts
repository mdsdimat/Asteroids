import sequelize from './dbconn';
import Theme from './models/Theme';
import UserTheme from './models/UserTheme';

sequelize.addModels([Theme, UserTheme]);

(async () => {
  await sequelize.sync({ force: true });
  await Theme.create({ name: 'light' });
  await Theme.create({ name: 'dark' });

  console.log('All models were synchronized successfully.');
})();

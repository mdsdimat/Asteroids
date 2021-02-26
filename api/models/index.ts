import sequelize from '../dbconn';
import Theme from './Theme';
import UserTheme from './UserTheme';

sequelize.addModels([Theme, UserTheme]);

Theme.hasMany(UserTheme);
UserTheme.belongsTo(Theme);

export default sequelize;
export { Theme, UserTheme };

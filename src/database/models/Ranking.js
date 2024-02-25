import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import User from './User';

class Ranking extends Model {}

Ranking.init({
  score: DataTypes.INTEGER,

  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
  },
}, {
  sequelize,
  timestamps: false,
  tableName: 'ranking',
  underscored: true,
});

Ranking.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasOne(Ranking, {
  foreignKey: 'userId',
  as: 'ranking',
});

export default Ranking;

import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize';
import User from './User';

class Ranking extends Model {}

Ranking.init({
  score: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        msg: 'O valor deve ser um número inteiro.',
      },
    },
  },

  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    unique: {
      msg: 'Este usuário já está registrado no ranking.',
    },
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

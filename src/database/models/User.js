import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from './sequelize';

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    defaultValue: '',
    unique: {
      msg: 'Este usuário já está cadastrado',
    },
    validate: {
      len: {
        args: [4, 20],
        msg: 'O nome de usuário deve ter entre 4 e 20 caracteres.',
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    defaultValue: '',
    unique: {
      msg: 'Email já cadastrado.',
    },
    validate: {
      isEmail: {
        msg: 'Digite um email em um formato válido',
      },
    },
  },

  password: {
    type: DataTypes.STRING,
  },

  passwordText: {
    type: DataTypes.VIRTUAL,
    validate: {
      len: {
        args: [6, 20],
        msg: 'Sua senha deve conter de 6 a 20 caracteres',
      },
    },
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  tableName: 'users',
});

User.addHook('beforeSave', (user) => {
  const salt = bcrypt.genSaltSync(5);
  user.password = bcrypt.hashSync(user.passwordText, salt);
});

User.addHook('beforeUpdate', (user) => {
  const salt = bcrypt.genSaltSync(5);
  user.password = bcrypt.hashSync(user.passwordText, salt);
});

export default User;

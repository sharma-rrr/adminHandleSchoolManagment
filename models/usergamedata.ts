'use strict';
import { Model } from 'sequelize';

interface UserGameDataAttributes {
  userId: string;
  gameId: string;
  points: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserGameData extends Model<UserGameDataAttributes> implements UserGameDataAttributes {
    userId!: string;
    gameId!: string;
    points!: number;
  }

  UserGameData.init({
    userId: {
      type: DataTypes.STRING,
    },
    gameId: {
      type: DataTypes.STRING, 
     
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'UserGames', 
  });

  return UserGameData; 
};

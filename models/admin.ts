'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

interface GameAttributes {
  gameId: number;
 gameTime: string;
  addTime:string;

}

module.exports = (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes) => {
  class adminhadle extends Model<GameAttributes> implements GameAttributes {
    gameId!: number;
    gameTime!: string;
    addTime!:string;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  adminhadle.init({
    gameId: { type: DataTypes.INTEGER},
    gameTime: { type: DataTypes.STRING},
    addTime: { type: DataTypes.STRING },
  
  }, {
    sequelize,
    modelName: 'Admins',
  });

  return adminhadle;
};

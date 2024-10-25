'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

interface GameAttributes {
  image: string;
  name: string;
  points:number;

}

module.exports = (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes) => {
  class Reward extends Model<GameAttributes> implements GameAttributes {
    image!: string;
    name!: string;
    points!:number;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  Reward.init({
    image: { type: DataTypes.STRING},
    name: { type: DataTypes.STRING},
    points: { type: DataTypes.INTEGER,defaultValue: 0 },
  
  }, {
    sequelize,
    modelName: 'Rewards',
  });

  return Reward;
};

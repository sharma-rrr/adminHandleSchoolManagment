'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

interface GameAttributes {
  image: string;
  heading: string;
  imagelink:string;

}

module.exports = (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes) => {
  class Gamedata extends Model<GameAttributes> implements GameAttributes {
    image!: string;
  heading!: string;
  imagelink!: string;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  Gamedata.init({
    image: { type: DataTypes.STRING},
    heading: { type: DataTypes.STRING},
    imagelink: { type: DataTypes.STRING},
  
  }, {
    sequelize,
    modelName: 'Dashboards',
  });

  return Gamedata;
};

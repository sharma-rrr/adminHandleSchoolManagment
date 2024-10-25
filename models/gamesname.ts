'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

interface GameAttributes {
  gamename: string;
  gameimage: string;
  points: number;
  linkhomeimage: string;
  gamelink: string;
  favorite: number;
  players: number;
  description: string;
  active:boolean;
}

module.exports = (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes) => {
  class Game extends Model<GameAttributes> implements GameAttributes {
    gamename!: string;
    gameimage!: string;
    points!: number;
    linkhomeimage!: string;
    gamelink!: string;
    favorite!: number;
    players!: number;
    description!: string;
    active!:boolean;


    static associate(models: any) {
      // Define associations here if any
    }
  }

  Game.init({
    gamename: { type: DataTypes.STRING},
    gameimage: { type: DataTypes.STRING},
    points: { type: DataTypes.INTEGER,defaultValue:0 },
    linkhomeimage: { type: DataTypes.STRING },
    gamelink: { type: DataTypes.STRING},
    favorite: { type: DataTypes.INTEGER,defaultValue:0 },
    players: { type: DataTypes.INTEGER,defaultValue:0 },
    description: { type: DataTypes.TEXT},  
    active:{ type: DataTypes.BOOLEAN,defaultValue:0 }, 
  }, {
    sequelize,
    modelName: 'Gamedetails',
  });

  return Game;
};

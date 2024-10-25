'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

interface GameAttributes {
  rewardId: number;
  amount: number;  // Changed from string to number (DECIMAL type is used)
  name: string;
  fullName:string;
  phoneNumber:number;
  pinCode:number;
  address:string
  userId: string;
  status: string;
  
}

module.exports = (sequelize: Sequelize, DataTypes: typeof import('sequelize').DataTypes) => {
  class Rewarduser extends Model<GameAttributes> implements GameAttributes {
    rewardId!: number;
    amount!: number;  // Updated type here as well
    name!: string;
    fullName!:string;
    phoneNumber!:number;
    pinCode!:number;
    address!:string
    userId!: string;
    status!: string;

    static associate(models: any) {
      // Define associations here if any
    }
  }

  Rewarduser.init({
    rewardId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },  // Changed type to DECIMAL for numeric values
    fullName: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.INTEGER },
    pinCode:{ type: DataTypes.INTEGER },
    address:{type:DataTypes.STRING},
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING,defaultValue: 'pending' },
  }, {
    sequelize,
    modelName: 'Redeems',
  });

  return Rewarduser;
};

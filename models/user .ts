'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
  specification: string;
  sixthClass: string;
  seventhClass: string;
  eighthClass: string;
  ninthClass:string;
  tenthClass:string;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
 specification!: string;
  sixthClass!: string;
  seventhClass!: string;
  eighthClass!: string;
  ninthClass!:string;
  tenthClass!:string;
  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    specification :{type:DataTypes.STRING,},
    sixthClass: {type:DataTypes.STRING},
    seventhClass: {type:DataTypes.STRING},
    eighthClass: {type:DataTypes.STRING},
    ninthClass:{type:DataTypes.STRING},
    tenthClass: {type:DataTypes.STRING},
  
 
  }, {
    sequelize,
    modelName: 'Users',
  });
  return  User;
};

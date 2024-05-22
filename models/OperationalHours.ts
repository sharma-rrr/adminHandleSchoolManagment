'use strict';
import { StringifyOptions } from 'querystring';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    schoolId: String;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  operational extends Model<UserAttributes>
  implements UserAttributes {         
    dayOfWeek!:string;
    openTime!: string;
    closeTime!:string;
    schoolId!:String;

  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  operational.init({
    dayOfWeek :{type:DataTypes.STRING,},
    openTime: {type:DataTypes.STRING},
    closeTime: {type:DataTypes.STRING},
    schoolId: {type:DataTypes.STRING},
  
  }, {
    sequelize,
    modelName: 'hours',
  });
  return  operational;
};

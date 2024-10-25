'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
    otpValue: number;
    userId:string;
  active: boolean;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  OTP extends Model<UserAttributes>
  implements UserAttributes {
    otpValue!: number;
    userId!:string;
  active!: boolean;


  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OTP.init({
    otpValue :{type:DataTypes.INTEGER,},
    userId: {type:DataTypes.STRING},
    active:{type:DataTypes.BOOLEAN,defaultValue:0}

 
  }, {
    sequelize,
    modelName: 'UserOtps',
  });
  return  OTP;
};

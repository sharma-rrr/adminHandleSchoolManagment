'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
  name: string;
  email: string;
  password: string;
  logintype:number;
  coins:number;
  active:boolean;
  referralCode:number;
  userImage:number;
  username:string;
  refCount:number;
  level:number;

  

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  newUser extends Model<UserAttributes>
  implements UserAttributes {
    name!: string;
    email!: string;
    password!: string;
    logintype!:number;
    coins!:number;
    referralCode!:number;
    userImage!:number;
    active!: boolean;
    username!: string;
    refCount!:number;
    level!:number;




  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  newUser.init({
    name :{type:DataTypes.STRING,},
    email: {type:DataTypes.STRING},
    password: {type:DataTypes.STRING},
    logintype:{type:DataTypes.INTEGER},  
    coins:{type:DataTypes.INTEGER,defaultValue:0},
    referralCode:{type:DataTypes.INTEGER,defaultValue:0},
    userImage:{type:DataTypes.INTEGER,defaultValue:0},
    active:{type:DataTypes.BOOLEAN,defaultValue:0},
    username:{type:DataTypes.STRING},
    refCount:{type:DataTypes.INTEGER,defaultValue:0},
    level:{type:DataTypes.INTEGER,defaultValue:0},

 
  }, {
    sequelize,
    modelName: 'Newusers',
  });
  return  newUser;
};

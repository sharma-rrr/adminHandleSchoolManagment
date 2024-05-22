'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
    SchoolName:string;
    address:string;
    phone:string;
    email:string;
    website:string;
    inTime:string;
    outTime:string;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  admin extends Model<UserAttributes>
  implements UserAttributes {
    SchoolName!:string;
    address!:string;
    phone!:string;
    email!:string;
    website!:string;
    inTime!:string;
    outTime!:string;

  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  admin.init({
    SchoolName :{type:DataTypes.STRING,},
    address: {type:DataTypes.STRING},
    phone: {type:DataTypes.STRING},
    email: {type:DataTypes.STRING},
    website:{type:DataTypes.STRING},
    inTime: {type:DataTypes.STRING},
    outTime: {type:DataTypes.STRING},
  }, {
    sequelize,
    modelName: 'generalinfos',
  });
  return  admin;
};

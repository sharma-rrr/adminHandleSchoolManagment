'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
    schoolid: string;
    name: string;
    email: string;
    role: string;
    department: string;
    phoneNumber: string;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  minister extends Model<UserAttributes>
  implements UserAttributes {
    schoolid!: string;
    name!: string;
    email!: string;
    role!: string;
    department!: string;
    phoneNumber!: string;


  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  minister.init({
    schoolid :{type:DataTypes.STRING,},
    name: {type:DataTypes.STRING},
    email: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING},
    department:{type:DataTypes.STRING},
    phoneNumber: {type:DataTypes.STRING},
    
  }, {
    sequelize,
    modelName: 'Administers',
  });
  return  minister;
};

'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
    dayOfWeek: string;
    morningAssemblyTime: string;
    classStartTime: string;
    lunchBreakTime: string;
    classEndTime: string;
    schoolBusTimings: string;
    schoolId:string;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  schedule extends Model<UserAttributes>
  implements UserAttributes {
    dayOfWeek!: string;
    morningAssemblyTime!: string;
    classStartTime!: string;
    lunchBreakTime!: string;
    classEndTime!: string;
    schoolBusTimings!: string;
    schoolId!:string;



  

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  schedule.init({
    dayOfWeek :{type:DataTypes.STRING,},
    morningAssemblyTime: {type:DataTypes.STRING},
    classStartTime: {type:DataTypes.STRING},
    lunchBreakTime: {type:DataTypes.STRING},
    classEndTime:{type:DataTypes.STRING},
    schoolBusTimings: {type:DataTypes.STRING},
    schoolId:{type:DataTypes.STRING}
    
  }, {
    sequelize,
    modelName: 'DailySchedules',
  });
  return  schedule;
};

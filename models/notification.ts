'use strict';
import { Model } from 'sequelize';

interface NotificationAttributes {
 heading:string
  message: string;
  type: string;
  isRead: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Notification extends Model<NotificationAttributes> implements NotificationAttributes {
    heading!:string
    message!: string;
    type!: string;
    isRead!: boolean;

   
  }

  Notification.init({
    heading: {
      type: DataTypes.STRING,

    },
    
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('info', 'warning', 'alert', 'success'),
      defaultValue: 'info',
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Notifications',
  });

  return Notification;
};

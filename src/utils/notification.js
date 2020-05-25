import { notification } from 'antd';
import {
  NOTIFICATION_SUCCESS_MESSAGE,
  NOTIFICATION_ERROR_MESSAGE,
} from '../constants/notification';

export default ({ type, message, description, placement = 'bottomRight' }) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

export const successNotification = (description = '') => {
  notification.success({
    message: NOTIFICATION_SUCCESS_MESSAGE,
    placement: 'bottomRight',
    description,
  });
};

export const errorNotification = (description = '') => {
  notification.error({
    message: NOTIFICATION_ERROR_MESSAGE,
    placement: 'bottomRight',
    description,
    duration: 0,
  });
};

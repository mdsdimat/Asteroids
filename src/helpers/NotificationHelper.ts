import { notification } from 'antd';

export const openNotificationWithIcon = (type: string, message: string, description: string): void => {
  // @ts-ignore
  notification[type]({
    message,
    description,
  });
};

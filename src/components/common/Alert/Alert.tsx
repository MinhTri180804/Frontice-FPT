import './Alert.scss';
import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  CloseIcon,
  WarningIcon,
  CheckIcon,
  InfoIcon
} from '../../../assets/icons';
interface AlertProps {
  message: string;
  action?: string;
  type?: 'success' | 'error' | 'info' | 'warn';
  background?: 'light' | 'solid'
}

const iconMap = {
  success: CheckIcon,
  error: CloseIcon,
  warn: WarningIcon,
  info: InfoIcon,
};

const Alert: React.FC<AlertProps> = ({ message, action = 'Action', type = 'info', background = 'light' }) => {

  const capitalize = useCallback((str: string) => str.charAt(0).toUpperCase() + str.slice(1), []);

  const getNotificationContent = useCallback((message: string, Icon: React.ComponentType, action: string) => (
    <div className={`alert-container ${background}`}>
      <div className={`alert-icon ${type}`}>
        <Icon />
      </div>
      <h2>{capitalize(type)}</h2>
      <p>{message}</p>
      <div className='action-btn'>{action}</div>
    </div>
  ), [type, background, capitalize]);

  const showNotification = useCallback(() => {
    const Icon = iconMap[type];
    toast(getNotificationContent(message, Icon, action), {
      className: `custom-${type}-toast ${background}`,
    });
  }, [message, type, background, action, getNotificationContent]);

  useEffect(() => {
    if (message) {
      showNotification();
    }
  }, [message, showNotification]);

  return null;
};

export default Alert;

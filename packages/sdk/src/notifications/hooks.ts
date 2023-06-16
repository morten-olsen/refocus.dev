import { useContext } from 'react';
import { NotificationsContext } from './context';

const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider',
    );
  }

  return context.notifications;
};

const useNotificationAdd = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationAdd must be used within a NotificationsProvider',
    );
  }

  return context.add;
};

const useNotificationDismiss = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotificationDismiss must be used within a NotificationsProvider',
    );
  }

  return context.dismiss;
};

export { useNotifications, useNotificationAdd, useNotificationDismiss };

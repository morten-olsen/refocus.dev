import { useNotificationDismiss, useNotifications } from '@refocus/sdk';
import { Card, List } from '../../base';
import { Typography } from '../../typography';

const Notifications: React.FC = () => {
  const notifications = useNotifications();
  const dismiss = useNotificationDismiss();

  return (
    <List>
      {notifications.map((notification, index) => (
        <Card
          key={notification.id || index}
          onClick={() => dismiss(notification.id || '')}
        >
          {notification.title && (
            <Typography variant="title">{notification.title}</Typography>
          )}
          {notification.message}
        </Card>
      ))}
    </List>
  );
};

export { Notifications };

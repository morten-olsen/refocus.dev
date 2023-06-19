import {
  useDismissWidgetNotification,
  useWidgetNotifications,
} from '@refocus/sdk';
import { IoNotificationsSharp } from 'react-icons/io5';
import { Card, Popover, View } from '../../base';
import { useTheme } from 'styled-components';

const NotificationView: React.FC = () => {
  const notifications = useWidgetNotifications();
  const dismiss = useDismissWidgetNotification();
  const theme = useTheme();

  return (
    <View>
      <Popover>
        <Popover.Trigger>
          <View $p="sm">
            <IoNotificationsSharp
              color={
                notifications.length > 0
                  ? theme?.colors.bg.highlight
                  : undefined
              }
            />
          </View>
        </Popover.Trigger>
        <Popover.Portal>
          <>
            <Popover.Overlay />
            <Popover.Content>
              {notifications.length === 0 && (
                <Card $p="sm">No notifications</Card>
              )}
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  $p="sm"
                  onClick={() => dismiss(notification.id || '')}
                >
                  {notification.message}
                </Card>
              ))}
              <Popover.Arrow />
            </Popover.Content>
          </>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

export { NotificationView };

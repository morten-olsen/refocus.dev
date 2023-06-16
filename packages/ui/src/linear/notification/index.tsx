import { Card } from '../../base/card';
import { AsyncResponse, Expand } from '../../utils/types';
import { LinearClient } from '@linear/sdk';
type LinearNotificationProps = {
  notification: Expand<
    AsyncResponse<LinearClient['notifications']>['nodes'][0]
  >;
};

const LinearNotification: React.FC<LinearNotificationProps> = ({
  notification,
}) => {
  return <Card>Hello</Card>;
};

export { LinearNotification };

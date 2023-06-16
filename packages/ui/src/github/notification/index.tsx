import { Card } from '../../base/card';
import { AsyncResponse } from '../../utils/types';
import { Octokit } from 'octokit';

type GithubNotification = {
  notification: AsyncResponse<
    Octokit['rest']['activity']['listNotificationsForAuthenticatedUser']
  >['data'][0];
};

const GithubNotification: React.FC<GithubNotification> = ({ notification }) => {
  return (
    <Card>
      <div>{notification.repository.full_name}</div>
      <div>{notification.subject.title}</div>
      <div>{notification.reason}</div>
      <div>{notification.updated_at}</div>
    </Card>
  );
};

export { GithubNotification };

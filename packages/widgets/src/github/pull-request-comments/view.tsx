import {
  useAddWidgetNotification,
  useAutoUpdate,
  useGithubQuery,
  withGithub,
} from '@refocus/sdk';
import { Chat, Github, List } from '@refocus/ui';
import { Props } from './schema';
import { View as PullRequest } from '../pull-request/view';

type QueryData = {
  owner: string;
  repo: string;
  pr: number;
};

const View = withGithub<Props>(({ owner, repo, pr }) => {
  const addNotification = useAddWidgetNotification();
  const { data, fetch } = useGithubQuery(async (client, params: QueryData) => {
    const response = await client.rest.pulls.listReviewComments({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pr,
    });
    return response.data.slice(0, 5);
  });

  useAutoUpdate(
    {
      interval: 1000 * 60 * 5,
      action: async () => fetch({ owner, repo, pr }),
      callback: (next, prev) => {
        if (prev && next) {
          const previousIds = prev.map((comment) => comment.id);
          const newComments = next.filter(
            (comment) => !previousIds.includes(comment.id),
          );
          for (const comment of newComments) {
            addNotification({
              title: `New comments on PR #${pr} in ${owner}/${repo}`,
              message: comment.body,
            });
          }
        }
      },
    },
    [owner, repo, pr, addNotification],
  );

  if (!data) {
    return null;
  }

  return (
    <List>
      <PullRequest owner={owner} repo={repo} pr={pr} />
      {data.map((comment) => (
        <Chat.Message
          message={{
            sender: {
              name: comment.user.login,
              avatar: comment.user.avatar_url,
            },
            timestamp: new Date(comment.created_at),
            text: comment.body,
          }}
          key={comment.id}
        />
      ))}
    </List>
  );
}, Github.NotLoggedIn);

export { View };

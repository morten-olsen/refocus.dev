import { useAutoUpdate, useGithubQuery, withGithub } from '@refocus/sdk';
import { Props } from './schema';
import { Github } from '@refocus/ui';

type QueryData = {
  owner: string;
  repo: string;
  pr: number;
};

const View = withGithub<Props>(({ owner, repo, pr }) => {
  const { data, fetch } = useGithubQuery(async (client, params: QueryData) => {
    const response = await client.rest.pulls.get({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pr,
    });
    return response.data;
  });

  useAutoUpdate(
    {
      interval: 1000 * 60 * 5,
      action: async () => fetch({ owner, repo, pr }),
    },
    [owner, repo, pr],
  );

  if (!data) {
    return null;
  }

  return <Github.PullRequest pullRequest={data} />;
}, Github.NotLoggedIn);

export { View };

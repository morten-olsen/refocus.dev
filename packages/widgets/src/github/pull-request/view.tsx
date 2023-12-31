import {
  useAutoUpdate,
  useGithubQuery,
  useName,
  withGithub,
} from '@refocus/sdk';
import { Props } from './schema';
import { Github } from '@refocus/ui';

type QueryData = {
  owner: string;
  repo: string;
  pr: number;
};

const View = withGithub<Props>(({ owner, repo, pr }) => {
  const [, setName] = useName();
  const { data, fetch } = useGithubQuery(async (client, params: QueryData) => {
    const response = await client.rest.pulls.get({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.pr,
    });
    setName(`${params.owner}/${params.repo} #${params.pr}`);
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

  return (
    <Github.PullRequest
      pullRequest={data}
      onPress={() =>
        window.open(`https://github.com/${owner}/${repo}/pull/${pr}`, '_blank')
      }
    />
  );
}, Github.NotLoggedIn);

export { View };

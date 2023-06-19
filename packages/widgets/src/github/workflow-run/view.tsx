import {
  useAutoUpdate,
  useGithubQuery,
  useName,
  withGithub,
} from '@refocus/sdk';
import { Props } from './schema';
import { Github } from '@refocus/ui';

type QueryData = {
  id: number;
  owner: string;
  repo: string;
};

const WidgetView = withGithub<Props>(({ owner, repo, id }) => {
  const [, setName] = useName();
  const { data, fetch } = useGithubQuery(async (client, params: QueryData) => {
    const response = await client.rest.actions.getWorkflowRun({
      owner: params.owner,
      repo: params.repo,
      run_id: params.id,
    });
    setName(`${response.data.repository.full_name} ${response.data.name}`);
    return response.data;
  });

  useAutoUpdate(
    {
      interval: 1000 * 60 * 5,
      action: async () => fetch({ owner, repo, id }),
    },
    [owner, repo, id],
  );

  if (!data) {
    return null;
  }

  return (
    <Github.WorkflowRun
      workflowRun={data}
      onPress={() =>
        window.open(
          `https://github.com/${owner}/${repo}/actions/runs/${id}`,
          '_blank',
        )
      }
    />
  );
}, Github.NotLoggedIn);

export { WidgetView as View };

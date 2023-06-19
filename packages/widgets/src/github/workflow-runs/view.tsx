import {
  useAutoUpdate,
  useGithubQuery,
  useName,
  withGithub,
} from '@refocus/sdk';
import { Props } from './schema';
import { Github, List } from '@refocus/ui';

type QueryData = {
  owner: string;
  repo: string;
};

const WidgetView = withGithub<Props>(({ owner, repo }) => {
  const [, setName] = useName();
  const { data, fetch } = useGithubQuery(async (client, params: QueryData) => {
    const response = await client.rest.actions.listWorkflowRunsForRepo({
      owner: params.owner,
      repo: params.repo,
    });
    setName(`${params.owner}/${params.repo} workflow runs`);
    return response.data.workflow_runs.slice(0, 5);
  });
  console.log(data);

  useAutoUpdate(
    {
      interval: 1000 * 60 * 5,
      action: async () => fetch({ owner, repo }),
    },
    [owner, repo],
  );

  if (!data) {
    return null;
  }

  return (
    <List>
      {data?.map((run) => (
        <Github.WorkflowRun
          workflowRun={run}
          onPress={() =>
            window.open(
              `https://github.com/${owner}/${repo}/actions/runs/${run.id}`,
              '_blank',
            )
          }
        />
      ))}
    </List>
  );
}, Github.NotLoggedIn);

export { WidgetView as View };

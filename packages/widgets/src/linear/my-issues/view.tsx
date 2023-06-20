import {
  useAutoUpdate,
  useLinearQuery,
  useName,
  withLinear,
} from '@refocus/sdk';
import { Panel, Linear } from '@refocus/ui';
import { useEffect } from 'react';

const WidgetView = withLinear(() => {
  const [, setName] = useName();
  const { data, fetch } = useLinearQuery(async (client) => {
    const me = await client.viewer;
    const issues = await me.assignedIssues({
      filter: {
        completedAt: {
          null: true,
        },
      },
    });
    return issues.nodes;
  });

  useEffect(() => {
    setName('My issues');
  }, [setName]);

  useAutoUpdate(
    {
      action: fetch,
      interval: 1000 * 60 * 5,
    },
    [],
  );
  return (
    <Panel title="My issue">
      <ul>
        {data?.map((issue) => (
          <Linear.Issue key={issue.id} issue={issue} />
        ))}
      </ul>
    </Panel>
  );
}, Linear.NotLoggedIn);

export { WidgetView as View };

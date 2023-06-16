import { useLinearQuery, withLinear } from '@refocus/sdk';
import { Panel, Linear } from '@refocus/ui';
import { useEffect } from 'react';

const LinearMyIssues = withLinear(() => {
  const issues = useLinearQuery(async (client) => {
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
    issues.fetch();
  }, []);

  return (
    <Panel title="My issue">
      <ul>
        {issues.data?.map((issue) => (
          <Linear.Issue key={issue.id} issue={issue} />
        ))}
      </ul>
    </Panel>
  );
}, Linear.NotLoggedIn);

export { LinearMyIssues };

import { useAutoUpdate, useLinearQuery, withLinear } from '@refocus/sdk';
import { Avatar, Card, Linear, Typography, View } from '@refocus/ui';

type LinearIssueProps = {
  id: string;
};

const WidgetView = withLinear<LinearIssueProps>(({ id }) => {
  const { data, fetch } = useLinearQuery(async (client) => {
    const issue = await client.issue(id);
    const assignee = await issue.assignee;
    const creator = await issue.creator;
    const state = await issue.state;
    return {
      issue,
      assignee,
      creator,
      state,
    };
  });

  useAutoUpdate(
    {
      action: fetch,
      interval: 1000 * 60 * 5,
    },
    [id],
  );

  return (
    <Card
      $fr
      $gap="sm"
      $p="md"
      $m="sm"
      onClick={() => window.open(data?.issue.url, '_blank')}
    >
      <View>
        <Typography variant="tiny">
          {data?.state?.name} - {data?.issue.priorityLabel}
        </Typography>
        <Typography variant="title">{data?.issue?.title}</Typography>
        <Typography variant="tiny">
          {data?.issue.description?.substring(0, 100)}
        </Typography>
      </View>
      {data?.assignee && (
        <Avatar url={data?.assignee?.avatarUrl} decal="Assigned" />
      )}
      {data?.creator && (
        <Avatar url={data?.creator?.avatarUrl} decal="Creator" />
      )}
    </Card>
  );
}, Linear.NotLoggedIn);

export { WidgetView };

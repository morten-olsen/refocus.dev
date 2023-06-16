import {
  useAddWidgetNotification,
  useAutoUpdate,
  useLinearQuery,
  withLinear,
} from '@refocus/sdk';
import { Chat, Linear, List, View } from '@refocus/ui';
import { WidgetView as LinearIssueSummery } from '../issue/view';

type LinearIssueProps = {
  id: string;
};

const WidgetView = withLinear<LinearIssueProps>(({ id }) => {
  const addNotification = useAddWidgetNotification();
  const { data, fetch } = useLinearQuery(async (client) => {
    const issue = await client.issue(id);
    const comments = await issue.comments();
    return comments.nodes;
  });

  useAutoUpdate(
    {
      action: fetch,
      interval: 1000 * 60 * 1,
      callback: (next, prev) => {
        if (!next || !prev) {
          return;
        }

        const prevIds = prev.map((c) => c.id);
        const newMessages = next.filter((c) => !prevIds.includes(c.id));
        for (const message of newMessages) {
          addNotification({
            title: `New message on ${id}`,
            message: message.body.substring(0, 100),
          });
        }
      },
    },
    [id],
  );

  return (
    <>
      <LinearIssueSummery id={id} />
      <List>
        {data?.length === 0 && <View>No comments</View>}
        {data?.map((comment) => (
          <Chat.Message
            message={{
              sender: {
                name: '',
              },
              timestamp: comment.createdAt,
              text: comment.body,
            }}
          />
        ))}
      </List>
    </>
  );
}, Linear.NotLoggedIn);

export { WidgetView };

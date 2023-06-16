import {
  useAddWidgetNotification,
  useAutoUpdate,
  useSlackQuery,
  withSlack,
} from '@refocus/sdk';
import { Props } from './schema';
import { Message } from './message/view';
import { useState } from 'react';
import { Chat, List, Slack, Typography, View } from '@refocus/ui';

type PostMessageOptions = {
  message: string;
};

const WidgetView = withSlack<Props>(({ conversationId }) => {
  const addNotification = useAddWidgetNotification();
  const [message, setMessage] = useState('');
  const { fetch, data } = useSlackQuery(async (client, props: Props) => {
    const response = await client.send('conversations.history', {
      channel: props.conversationId,
      limit: 5,
    });
    return response.messages!;
  });
  const info = useSlackQuery(async (client, props: Props) => {
    const response = await client.send('conversations.info', {
      channel: props.conversationId,
    });
    return response.channel!;
  });

  const { fetch: post } = useSlackQuery(
    async (client, props: PostMessageOptions) => {
      client.send('chat.postMessage', {
        text: props.message,
        channel: conversationId,
      });
    },
  );

  const update = useAutoUpdate(
    {
      action: async () => {
        await info.fetch({ conversationId });
        return fetch({
          conversationId,
        });
      },
      interval: 1000 * 60,
      callback: (next, prev) => {
        if (!prev || !next) {
          return;
        }
        const prevIds = prev.map((message) => message.ts);
        const newMessages = next.filter(
          (message) => !prevIds.includes(message.ts),
        );
        for (let message of newMessages) {
          addNotification({
            title: 'New Message',
            message: message.text || '[No Text]',
          });
        }
      },
    },
    [conversationId],
  );

  return (
    <View $p="md">
      <button onClick={update}>Update</button>
      <Typography variant="header">
        {info.data?.name || 'Direct message'}
      </Typography>
      <Chat.Compose
        value={message}
        onValueChange={setMessage}
        onSend={() => post({ message })}
      />
      <List>
        {data?.map((message) => (
          <Message
            key={message.ts}
            text={message.text || '[No text|'}
            userId={message.user}
          />
        ))}
      </List>
    </View>
  );
}, Slack.NotLoggedIn);

export { WidgetView };

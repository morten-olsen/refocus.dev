import {
  useAddWidgetNotification,
  useAutoUpdate,
  useName,
  useSlackQuery,
  withSlack,
} from '@refocus/sdk';
import styled from 'styled-components';
import { Props } from './schema';
import { Message } from './message/view';
import { useState } from 'react';
import { Chat, List, Slack, Typography, View } from '@refocus/ui';

type PostMessageOptions = {
  message: string;
};

const MessageList = styled(View)`
  transform: scaleY(-1);
  flex: 1;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 1;

  & > * {
    transform: scaleY(-1);
  }
`;

const Wrapper = styled(View)`
  max-height: 100%;
  overflow: hidden;
`;
const WidgetView = withSlack<Props>(({ conversationId }) => {
  const [, setName] = useName();
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
    setName(response.channel!.name || 'Direct message');
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

  useAutoUpdate(
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
    <Wrapper $p="sm" $fc $gap="sm">
      <MessageList $gap="md" $fc>
        {data?.map((message) => (
          <Message
            key={message.ts}
            text={message.text || '[No text|'}
            userId={message.user}
          />
        ))}
      </MessageList>
      <Chat.Compose
        value={message}
        onValueChange={setMessage}
        onSend={() => post({ message })}
      />
    </Wrapper>
  );
}, Slack.NotLoggedIn);

export { WidgetView };

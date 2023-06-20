import {
  useAddWidgetNotification,
  useAutoUpdate,
  useName,
  useSlackQuery,
  withSlack,
} from '@refocus/sdk';
import styled from 'styled-components';
import { Props } from './schema';
import { ConversationsHistoryResponse } from '@slack/web-api';
import { useState } from 'react';
import { Chat, Slack, Typography, View } from '@refocus/ui';
import { User } from '../block/elements/user';
import { Message } from './message/view';

type PostMessageOptions = {
  message: string;
};

type MessageType = Exclude<
  ConversationsHistoryResponse['messages'],
  undefined
>[0];

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
const WidgetView = withSlack<Props>(({ conversationId, ts }) => {
  const [, setName] = useName();
  const addNotification = useAddWidgetNotification();
  const [message, setMessage] = useState('');
  const { fetch, data } = useSlackQuery(async (client, props: Props) => {
    if (props.ts) {
      const response = await client.send('conversations.replies', {
        channel: props.conversationId,
        ts: props.ts,
      });
      return response.messages! as MessageType[];
    } else {
      const response = await client.send('conversations.history', {
        channel: props.conversationId,
        limit: 5,
      });
      return response.messages! as MessageType[];
    }
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
        await info.fetch({ conversationId, ts });
        return fetch({
          conversationId,
          ts,
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
    [conversationId, ts],
  );

  return (
    <Wrapper $p="sm" $fc $gap="sm">
      <MessageList $gap="md" $fc>
        {data?.map((message) => {
          if ('subtype' in message && message.subtype === 'channel_join') {
            return (
              <Typography key={message.ts}>
                <User id={message.user!} /> joined the channel
              </Typography>
            );
          }
          return (
            <Message
              key={message.ts}
              {...message}
              conversationId={conversationId}
            />
          );
        })}
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

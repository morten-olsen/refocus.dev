import { Chat, Dialog, Typography, View } from '@refocus/ui';
import { useProfile } from '../../hooks';
import { ConversationsHistoryResponse } from '@slack/web-api';
import { render } from '../../block/render';
import { useMemo } from 'react';
import { WidgetProvider, WidgetView } from '@refocus/sdk';
import { styled } from 'styled-components';
import { User } from '../../block/elements/user';
import { UserAvatar } from '../../block/elements/user-avatar';

type Message = Exclude<
  ConversationsHistoryResponse['messages'],
  undefined
>[0] & {
  conversationId: string;
};

const LinkText = styled(Typography)`
  color: ${({ theme }) => theme.colors.bg.highlight};
  cursor: pointer;
`;

const Message: React.FC<Message> = ({
  text,
  blocks,
  user,
  reactions,
  reply_count,
  conversationId,
  thread_ts,
  ts,
}) => {
  const profile = useProfile(user);
  const threadData = useMemo(
    () => ({ conversationId, ts: thread_ts }),
    [conversationId, thread_ts],
  );

  const sendTime = new Date(parseInt(ts || '0', 10) * 1000);

  return (
    <Chat.Message
      message={{
        sender: {
          name: profile?.real_name || profile?.name || 'Unknown',
          avatar: profile?.profile?.image_192,
        },
        text: (
          <>
            {blocks ? render(blocks as any) : text}
            {(reactions || reply_count) && (
              <View $bg="highlight100" $br $p="sm">
                {reactions && (
                  <View $gap="sm" $fr>
                    {reactions.map((reaction) => (
                      <Typography variant="tiny" key={reaction.name} $gap="sm">
                        {reaction.name}
                        <View $fr>
                          {reaction.users?.map((user) => (
                            <UserAvatar id={user} />
                          ))}
                        </View>
                      </Typography>
                    ))}
                  </View>
                )}
                {reply_count && (
                  <Dialog>
                    <Dialog.Trigger>
                      <LinkText variant="tiny" $gap="sm">
                        {reply_count} replies
                      </LinkText>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay />
                      <Dialog.Content>
                        <WidgetProvider
                          id="slack.conversation"
                          data={threadData}
                        >
                          <WidgetView />
                        </WidgetProvider>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog>
                )}
              </View>
            )}
          </>
        ),
        timestamp: sendTime,
      }}
    />
  );
};

export { Message };

import { Chat } from '@refocus/ui';
import { useProfile } from '../../hooks';
import { Props } from './schema';

const Message: React.FC<Props> = ({ text, userId }) => {
  const profile = useProfile(userId);

  return (
    <Chat.Message
      message={{
        sender: {
          name: profile?.real_name || profile?.name || 'Unknown',
        },
        text,
        timestamp: new Date(),
      }}
    />
  );
};

export { Message };

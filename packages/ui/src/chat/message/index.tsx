import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, View } from '../../base';
import { Typography } from '../../typography';
import { formatRelativeTime } from '../../utils/time';

type MessageProps = {
  message: {
    text: React.ReactNode;
    timestamp: Date;
    sender: {
      avatar?: string;
      name: string;
    };
  };
  onPress?: () => void;
};

const MessageContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.bg.highlight100};
  margin-bottom: 15px;
  position: relative;
`;

const ArrowDown = styled.div`
  position: absolute;
  bottom: -10px;
  left: 30px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors.bg.highlight100};
`;

const Message: React.FC<MessageProps> = ({ message, onPress }) => {
  const [time, setTime] = useState<string>(
    formatRelativeTime(message.timestamp),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatRelativeTime(message.timestamp));
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <View>
      <MessageContainer $p="md" onClick={onPress}>
        {message.text}
        <Typography variant="tiny">{time}</Typography>
        <ArrowDown />
      </MessageContainer>
      <View $fr $gap="sm" $items="center" $px="md">
        <Avatar
          size="sm"
          url={message.sender.avatar}
          name={message.sender.name}
        />
        <View>
          <Typography variant="overline">{message.sender.name}</Typography>
        </View>
      </View>
    </View>
  );
};

export { Message };

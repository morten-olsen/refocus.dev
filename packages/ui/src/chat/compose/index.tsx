import { styled } from 'styled-components';
import { View } from '../../base';

type ComposeProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSend?: () => void;
};

const Input = styled(View)`
  background: ${({ theme }) => theme.colors.bg.highlight100};
  padding: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
`;

const Send = styled.button`
  all: unset;
  background: ${({ theme }) => theme.colors.bg.highlight};
  padding: ${({ theme }) => `${theme.space.sm}${theme.units.space}`};
`;

const Compose: React.FC<ComposeProps> = ({ value, onValueChange, onSend }) => (
  <View $fr>
    <Input
      $f={1}
      $u
      placeholder="Type a message..."
      as="input"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
    {!!onSend && <Send onClick={onSend}>Send</Send>}
  </View>
);

export { Compose };

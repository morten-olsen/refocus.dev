import { useGithub, useWidget, useWidgetId } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { Button, View } from '../../base';
import { Typography } from '../../typography';
import { styled } from 'styled-components';

const Description = styled(Typography)`
  text-align: center;
`;

const NotLoggedIn: React.FC = () => {
  const { login } = useGithub();
  const type = useWidgetId();
  const widget = useWidget(type);

  return (
    <View $p="md" $fc $items="center" $gap="md">
      <Description>
        You need to be logged in to Github to see {widget?.name}
      </Description>
      <Button icon={<SiGithub />} onClick={login} title="Login" />
    </View>
  );
};

export { NotLoggedIn };

import { GithubLogin as GithubLoginComponent } from '@refocus/sdk';
import { SiGithub } from 'react-icons/si';
import { useCallback, useState } from 'react';
import { Button, Dialog, View } from '../../base';

const GithubLogin: GithubLoginComponent = ({ setToken, cancel }) => {
  const [value, setValue] = useState('');
  const save = useCallback(() => {
    setToken(value);
  }, [setToken, value]);
  return (
    <Dialog open={true}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <View $fc $gap="md">
            <View
              as="input"
              $u
              placeholder="Personal Access Token"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Dialog.Buttons>
              <Button icon={<SiGithub />} onClick={save} title="Save" />
            </Dialog.Buttons>
          </View>
          <Dialog.CloseButton onClick={cancel} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { GithubLogin };

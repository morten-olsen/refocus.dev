import { SlackLogin as SlackLoginComponent } from '@refocus/sdk';
import { useCallback, useState } from 'react';
import { Button, Dialog, View } from '../../base';

const SlackLogin: SlackLoginComponent = ({ setToken, cancel }) => {
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
              placeholder="Token"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Dialog.Buttons>
              <Button onClick={save} title="Save" />
            </Dialog.Buttons>
          </View>
          <Dialog.CloseButton onClick={cancel} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { SlackLogin };

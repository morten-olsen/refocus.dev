import { LinearLogin as LinearLoginComponent } from '@refocus/sdk';
import { useCallback, useState } from 'react';
import { Button, Dialog, View } from '../../base';
import { SiLinear } from 'react-icons/si';

const LinearLogin: LinearLoginComponent = ({ setApiKey, cancel }) => {
  const [value, setValue] = useState('');
  const save = useCallback(() => {
    setApiKey(value);
  }, [setApiKey, value]);
  return (
    <Dialog open={true}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <View $fc $gap="md">
            <View
              as="input"
              $u
              value={value}
              placeholder="API Token"
              onChange={(e) => setValue(e.target.value)}
            />
            <Dialog.Buttons>
              <Button icon={<SiLinear />} onClick={save} title="Save" />
            </Dialog.Buttons>
          </View>
          <Dialog.CloseButton onClick={cancel} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { LinearLogin };

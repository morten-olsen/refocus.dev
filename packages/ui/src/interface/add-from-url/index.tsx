import { useState, useCallback, useEffect } from 'react';
import { Card, Dialog, View } from '../../base';
import { useGetWidgetsFromUrl } from '@refocus/sdk';
import { Typography } from '../../typography';

type AddWidgetFromUrlProps = {
  onCreate: (name: string, data: any) => void;
  children?: React.ReactNode;
};

const Root: React.FC<AddWidgetFromUrlProps> = ({ onCreate, children }) => {
  const [url, setUrl] = useState('');
  const [widgets, update] = useGetWidgetsFromUrl();

  const handleSave = useCallback(
    (id: string, data: any) => {
      onCreate(id, data);
    },
    [onCreate],
  );

  useEffect(() => {
    const parsed = new URL(url, 'http://example.com');
    if (parsed.host === 'example.com') {
      return;
    }
    update(parsed);
  }, [url, update]);

  return (
    <Dialog>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.CloseButton />
          <View $fc $gap="sm">
            <View $fr>
              <View
                as="input"
                $f={1}
                $u
                placeholder="URL"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
              />
            </View>
            {widgets.map((widget) => (
              <View key={widget.id}>
                <Dialog.Close>
                  <Card
                    $fr
                    $items="center"
                    $gap="md"
                    $p="md"
                    onClick={() => handleSave(widget.id, widget.data)}
                  >
                    <View>
                      <Typography variant="header">{widget.icon}</Typography>
                    </View>
                    <View>
                      <Typography variant="title">{widget.name}</Typography>
                      {widget.description && (
                        <Typography variant="body">
                          {widget.description}
                        </Typography>
                      )}
                    </View>
                  </Card>
                </Dialog.Close>
              </View>
            ))}
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const AddWidgetFromUrl = Object.assign(Root, {
  Trigger: Dialog.Trigger,
});

export { AddWidgetFromUrl };

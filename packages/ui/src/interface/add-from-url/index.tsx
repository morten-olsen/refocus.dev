import { useState, useCallback, useEffect } from 'react';
import { Card, Dialog, View } from '../../base';
import { useGetWidgetsFromUrl } from '@refocus/sdk';
import { Typography } from '../../typography';
import { AnimatePresence, motion } from 'framer-motion';

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
    try {
      const parsed = new URL(url, 'http://example.com');
      update(parsed);
      if (parsed.host === 'example.com') {
        return;
      }
    } catch (e) {
      return;
    }
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
            <AnimatePresence>
              {widgets.length === 0 && url && (
                <View
                  $fr
                  $items="center"
                  $gap="sm"
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                >
                  <Typography variant="body">
                    No widgets found at this URL
                  </Typography>
                </View>
              )}
              {widgets.length > 0 &&
                widgets.map((widget) => (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 20, height: 0 }}
                  >
                    <Dialog.Close>
                      <Card
                        $fr
                        $items="center"
                        $gap="md"
                        $p="md"
                        onClick={() => handleSave(widget.id, widget.data)}
                      >
                        <View>
                          <Typography variant="header">
                            {widget.icon}
                          </Typography>
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
                  </motion.div>
                ))}
            </AnimatePresence>
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

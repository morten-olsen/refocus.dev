import { useState, useCallback, useMemo } from 'react';
import { Card, Dialog, View } from '../../base';
import { WidgetEditor, WidgetProvider, useWidgets } from '@refocus/sdk';
import { Typography } from '../../typography';

type CreateWidgetProps = {
  onCreate: (name: string, data: any) => void;
  children?: React.ReactNode;
};

type WidgetEditorProps = {
  id: string;
  onSave: (data: any) => void;
};

const Editor: React.FC<WidgetEditorProps> = ({ id, onSave }) => {
  return (
    <WidgetProvider id={id}>
      <WidgetEditor onSave={onSave} />
    </WidgetProvider>
  );
};

type WidgetSelectorProps = {
  onSelect: (id: string) => void;
};

const WidgetSelector: React.FC<WidgetSelectorProps> = ({ onSelect }) => {
  const [search, setSearch] = useState<string>('');
  const widgets = useWidgets();
  const editableWidgets = useMemo(
    () => widgets.filter((widget) => widget.edit),
    [widgets],
  );
  const searchResults = useMemo(
    () =>
      !search
        ? editableWidgets
        : editableWidgets.filter((widget) =>
            widget.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()),
          ),
    [search, editableWidgets],
  );

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect],
  );

  return (
    <div style={{ height: '50vh' }}>
      <Typography
        as="input"
        placeholder="Search"
        value={search}
        $u
        onChange={(e) => setSearch(e.target.value)}
      />
      {searchResults.map((widget) => (
        <Card
          $fr
          $items="center"
          $gap="md"
          $p="md"
          key={widget.id}
          onClick={() => handleSelect(widget.id)}
        >
          <View>
            <Typography variant="header">{widget.icon}</Typography>
          </View>
          <View>
            <Typography variant="title">{widget.name}</Typography>
            {widget.description && (
              <Typography variant="body">{widget.description}</Typography>
            )}
          </View>
        </Card>
      ))}
    </div>
  );
};

const Root: React.FC<CreateWidgetProps> = ({ onCreate, children }) => {
  const [id, setId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = useCallback(
    (data: any) => {
      onCreate(id, data);
      setOpen(false);
    },
    [id, onCreate],
  );

  const handleOpen = useCallback((state: boolean) => {
    setOpen(state);
    setId('');
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.CloseButton />
          {id && <Editor id={id} onSave={handleSave} />}
          {!id && <WidgetSelector onSelect={setId} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const CreateWidget = Object.assign(Root, {
  Trigger: Dialog.Trigger,
});

export { CreateWidget };

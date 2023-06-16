import { useState, useCallback } from 'react';
import { Dialog } from '../../base';
import {
  WidgetEditor,
  WidgetProvider,
  useWidgets,
} from '@refocus/sdk';

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
  const widgets = useWidgets();

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect],
  );

  return (
    <div>
      {widgets.map((widget) => (
        <button key={widget.id} onClick={() => handleSelect(widget.id)}>
          {widget.name}
        </button>
      ))}
    </div>
  );
};

const Root: React.FC<CreateWidgetProps> = ({ onCreate, children }) => {
  const [id, setId] = useState<string>('');

  const handleSave = useCallback(
    (data: any) => {
      onCreate(id, data);
    },
    [id, onCreate],
  );

  return (
    <Dialog>
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

import { useCallback, useState } from 'react';
import { Props } from './schema';
import { Button, Form } from '@refocus/ui';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Edit: React.FC<EditorProps> = ({ value, save }) => {
  const [id, setId] = useState(value?.conversationId || '');

  const handleSave = useCallback(() => {
    save({
      conversationId: id,
    });
  }, [id, save]);

  return (
    <Form>
      <Form.Field label="Id">
        <Form.Input value={id} onChange={(e) => setId(e.target.value)} />
      </Form.Field>
      <Form.Buttons>
        <Button onClick={handleSave} title="Save" />
      </Form.Buttons>
    </Form>
  );
};

export { Edit };

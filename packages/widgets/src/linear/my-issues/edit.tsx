import { useCallback } from 'react';
import { Button, Form } from '@refocus/ui';

type EditorProps = {
  save: (data: {}) => void;
};

const Edit: React.FC<EditorProps> = ({ save }) => {
  const handleSave = useCallback(() => {
    save({});
  }, [save]);

  return (
    <Form>
      <Form.Buttons>
        <Button onClick={handleSave} title="Save" />
      </Form.Buttons>
    </Form>
  );
};

export { Edit };

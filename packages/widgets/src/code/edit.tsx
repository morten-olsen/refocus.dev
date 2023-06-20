import { Button, CodeEditor, Form } from '@refocus/ui';
import { useCallback, useState } from 'react';
import { Props } from './schema';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Edit: React.FC<EditorProps> = ({ value, save }) => {
  const [code, setCode] = useState(value?.code || '');
  const [language, setLanguage] = useState(value?.language || '');
  const [name, setName] = useState(value?.name || '');

  const handleSave = useCallback(() => {
    save({
      name,
      code,
      language,
    });
  }, [code, save, language, name]);

  return (
    <Form>
      <Form.Field label="Name">
        <Form.Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Field>
      <Form.Field label="Language">
        <Form.Input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </Form.Field>
      <Form.Field label="Code">
        <CodeEditor language={language} value={code} setValue={setCode} />
      </Form.Field>
      <Form.Buttons>
        <Button onClick={handleSave} title="Save" />
      </Form.Buttons>
    </Form>
  );
};

export { Edit };

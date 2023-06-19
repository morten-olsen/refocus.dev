import { CodeEditor, Typography } from '@refocus/ui';
import { useCallback, useState } from 'react';
import { Props } from './schema';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Edit: React.FC<EditorProps> = ({ value, save }) => {
  const [markdown, setMarkdown] = useState(value?.markdown || '');
  const [name, setName] = useState(value?.name || '');

  const handleSave = useCallback(() => {
    save({
      name,
      markdown,
    });
  }, [markdown, save, name]);

  return (
    <div>
      <Typography
        as="input"
        $u
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CodeEditor language="markdown" value={markdown} setValue={setMarkdown} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { Edit };

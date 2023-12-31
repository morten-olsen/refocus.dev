import { useCallback, useState } from 'react';
import { Props } from './schema';
import { Button, Form } from '@refocus/ui';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Edit: React.FC<EditorProps> = ({ value, save }) => {
  const [owner, setOwner] = useState(value?.owner || '');
  const [repo, setRepo] = useState(value?.repo || '');
  const [id, setId] = useState(value?.id || '');

  const handleSave = useCallback(() => {
    save({
      owner,
      repo,
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    });
  }, [owner, repo, id, save]);

  return (
    <Form>
      <Form.Field label="Owner">
        <Form.Input value={owner} onChange={(e) => setOwner(e.target.value)} />
      </Form.Field>
      <Form.Field label="Repo">
        <Form.Input value={repo} onChange={(e) => setRepo(e.target.value)} />
      </Form.Field>
      <Form.Field label="PR">
        <Form.Input value={id} onChange={(e) => setId(e.target.value)} />
      </Form.Field>
      <Form.Buttons>
        <Button onClick={handleSave} title="Save" />
      </Form.Buttons>
    </Form>
  );
};

export { Edit };

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
  const [branch, setBranch] = useState(value?.branch || '');
  const [path, setPath] = useState(value?.path || '');
  const [highlight, setHighlight] = useState(value?.highlight || '');

  const handleSave = useCallback(() => {
    save({
      owner,
      repo,
      branch,
      path,
      highlight,
    });
  }, [owner, repo, branch, path, highlight, save]);

  return (
    <Form $fc>
      <Form.Field label="Owner">
        <Form.Input value={owner} onChange={(e) => setOwner(e.target.value)} />
      </Form.Field>
      <Form.Field label="Repo">
        <Form.Input value={repo} onChange={(e) => setRepo(e.target.value)} />
      </Form.Field>
      <Form.Field label="Branch">
        <Form.Input
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
      </Form.Field>
      <Form.Field label="Path">
        <Form.Input value={path} onChange={(e) => setPath(e.target.value)} />
      </Form.Field>
      <Form.Field label="Highlights">
        <Form.Input
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
        />
      </Form.Field>
      <Form.Buttons>
        <Button onClick={handleSave} title="Save" />
      </Form.Buttons>
    </Form>
  );
};

export { Edit };

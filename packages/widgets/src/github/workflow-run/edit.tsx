import { useCallback, useState } from 'react';
import { Props } from './schema';

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
    <div>
      <input
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        placeholder="Repo"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <input
        placeholder="PR"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { Edit };

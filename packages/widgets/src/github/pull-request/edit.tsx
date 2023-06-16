import { useCallback, useState } from 'react';
import { Props } from './schema';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Edit: React.FC<EditorProps> = ({ value, save }) => {
  const [owner, setOwner] = useState(value?.owner || '');
  const [repo, setRepo] = useState(value?.repo || '');
  const [pr, setPr] = useState(value?.pr || '');

  const handleSave = useCallback(() => {
    save({
      owner,
      repo,
      pr: typeof pr === 'string' ? parseInt(pr, 10) : pr,
    });
  }, [owner, repo, pr, save]);

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
        value={pr}
        onChange={(e) => setPr(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { Edit };

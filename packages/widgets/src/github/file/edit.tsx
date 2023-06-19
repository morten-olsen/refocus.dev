import { useCallback, useState } from 'react';
import { Props } from './schema';

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
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <input
        placeholder="Path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <input
        placeholder="Highlights"
        value={highlight}
        onChange={(e) => setHighlight(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { Edit };

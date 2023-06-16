import { useCallback, useState } from 'react';
import { Props } from './schema';

type EditorProps = {
  value?: Props;
  save: (data: Props) => void;
};

const Editor: React.FC<EditorProps> = ({ value, save }) => {
  const [data, setData] = useState<Props>(value || { username: '' });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(() => {
    save(data);
  }, [data, save]);

  return (
    <div>
      <input name="username" value={data.username} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { Editor };

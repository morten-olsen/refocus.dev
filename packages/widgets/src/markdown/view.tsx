import { useName } from '@refocus/sdk';
import ReactMarkdown from 'react-markdown';
import { Props } from './schema';
import { useEffect } from 'react';
import { View } from '@refocus/ui';

const WidgetView: React.FC<Props> = ({ markdown, name }) => {
  const [, setName] = useName();

  useEffect(() => {
    setName(name);
  }, [name, setName]);

  return (
    <View $px="md">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </View>
  );
};

export { WidgetView as View };

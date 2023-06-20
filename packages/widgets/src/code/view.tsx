import { useName } from '@refocus/sdk';
import { Props } from './schema';
import { useEffect } from 'react';
import { CodeEditor, View } from '@refocus/ui';
import { styled } from 'styled-components';

const FullHeight = styled(View)`
  height: 100%;
`;

const StyledCodeEditor = styled(CodeEditor)`
  height: 100%;
`;
const WidgetView: React.FC<Props> = ({ code, language, name }) => {
  const [, setName] = useName();

  useEffect(() => {
    setName(name);
  }, [name, setName]);

  return (
    <FullHeight $fc>
      <StyledCodeEditor
        readOnly
        language={language}
        value={code}
        setValue={() => {}}
      />
    </FullHeight>
  );
};

export { WidgetView as View };

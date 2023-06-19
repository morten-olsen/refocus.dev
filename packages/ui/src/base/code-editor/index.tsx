import styled from 'styled-components';
import { Range, editor as monacoEditor } from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import theme from 'monaco-themes/themes/Dracula.json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { View } from '../view';
import { Typography } from '../../typography';

type CodeEditorProps = {
  language?: string;
  readOnly?: boolean;
  className?: string;
  value?: string;
  highlight?: string;
  setValue: (value: string) => void;
};

const Wrapper = styled.div`
  min-height: 300px;
  position: relative;
`;

const EditorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .with-highlight .view-line span span {
    opacity: 0.3;
  }

  .with-highlight .view-line span span.highlight {
    opacity: 1;
  }
`;

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  setValue,
  highlight,
  readOnly = false,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monacoEditor.ICodeEditor | null>(null);
  useEffect(() => {
    if (!ref.current || !editor) {
      return;
    }
    const observer = new ResizeObserver(() => {
      editor.layout();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [editor]);
  const highlightPositions = useMemo(() => {
    const items = (highlight || '').split(',').map((item) => {
      const [positions, name] = item.split(':');
      const [start, end] = positions.split('-');
      return {
        start: parseInt(start, 10),
        end: parseInt(end, 10),
        name,
      };
    });
    return items;
  }, [highlight]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    editor.createDecorationsCollection(
      highlightPositions?.map(({ start, end }) => ({
        range: new Range(start, 1, end, 1),
        options: {
          isWholeLine: true,
          inlineClassName: 'highlight',
        },
      })) || [],
    );
  }, [editor, highlightPositions]);

  return (
    <>
      <Wrapper ref={ref} className={className}>
        <EditorWrapper>
          <MonacoEditor
            className={highlight ? 'with-highlight' : 'without-highlight'}
            value={value || ''}
            onChange={(nextValue) => setValue(nextValue || '')}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('theme', theme as any);
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                {
                  target: monaco.languages.typescript.ScriptTarget.ESNext,
                  allowNonTsExtensions: true,
                  moduleResolution:
                    monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  module: monaco.languages.typescript.ModuleKind.CommonJS,
                  noEmit: true,
                  jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
                  esModuleInterop: true,
                  typeRoots: ['node_modules/@types'],
                },
              );
            }}
            onMount={async (nextEditor) => {
              setEditor(nextEditor);
            }}
            theme="theme"
            language={language || 'typescript'}
            height="100%"
            width="100%"
            options={{
              readOnly: readOnly,
              minimap: {
                enabled: false,
              },
              fontFamily: 'Fira Code',
              scrollBeyondLastLine: false,
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              wordWrap: 'on',
              wrappingIndent: 'indent',
              tabSize: 2,
            }}
          />
        </EditorWrapper>
      </Wrapper>

      {highlightPositions.length > 0 && (
        <View $fr $gap="sm" $p="sm">
          {highlightPositions?.map(({ start, end, name }) => (
            <Typography
              variant="overline"
              as="button"
              onClick={() =>
                editor?.revealLinesInCenter(
                  start,
                  end,
                  monacoEditor.ScrollType.Smooth,
                )
              }
              key={`${start}-${end}`}
            >
              {name ? `${name}: [${start}-${end}]` : `[${start}-${end}]`}
            </Typography>
          ))}
        </View>
      )}
    </>
  );
};

export { CodeEditor };

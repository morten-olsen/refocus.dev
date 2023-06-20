import { Fragment } from 'react';
import { User } from './elements/user';
import { Block, Renderable } from './types';

const unicodeToEmoji = (unicode: string) => {
  const codePoints = unicode.split('-').map((u) => parseInt(u, 16));
  return String.fromCodePoint(...codePoints);
};

const renderElement = (item: Renderable) => {
  switch (item.type) {
    case 'text':
      return item.text.split('\n').flatMap((value, index, array) => {
        const jsx = <Fragment key={index}>{value}</Fragment>;
        if (index === array.length - 1) {
          return [jsx];
        }
        return [jsx, <br key={'br' + index} />];
      });

    case 'link':
      return (
        <a href={item.url} target="_blank">
          {item.text || item.url}
        </a>
      );
    case 'user':
      return <User key={item.user_id} id={item.user_id} />;
    case 'emoji':
      return unicodeToEmoji(item.unicode);
    case 'rich_text_list':
      return (
        <ul>
          {item.elements.map((elm, i) => (
            <li key={i}>{renderElement(elm)}</li>
          ))}
        </ul>
      );
    case 'rich_text':
    case 'rich_text_section':
      return (
        <>
          {item.elements.map((elm, i) => (
            <Fragment key={i}>{renderElement(elm)}</Fragment>
          ))}
        </>
      );
    default: {
      console.log('Unknown element type', item);
      return (
        <>
          Unknown element type: <pre>{JSON.stringify(item, null, 2)}</pre>
        </>
      );
    }
  }
};

const render = (blocks: Block[]) => {
  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>{renderElement(block)}</Fragment>
      ))}
    </>
  );
};

export { render };

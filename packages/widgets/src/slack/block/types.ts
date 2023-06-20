type TextElement = {
  type: 'text';
  text: string;
};

type LinkElement = {
  type: 'link';
  url: string;
  text: string;
};

type UserElement = {
  type: 'user';
  user_id: string;
};

type EmojiElement = {
  type: 'emoji';
  name: string;
  unicode: string;
};

type RichTextElement = TextElement | LinkElement | UserElement | EmojiElement;

type RichTextSection = {
  type: 'rich_text_section' | 'rich_text_list';
  elements: RichTextElement[];
};

type RichText = {
  type: 'rich_text';
  elements: RichTextSection[];
};

type Renderable = RichTextElement | RichText | RichTextSection;
type Block = RichText;

export type {
  TextElement,
  LinkElement,
  RichTextElement,
  RichText,
  UserElement,
  EmojiElement,
  Block,
  Renderable,
};

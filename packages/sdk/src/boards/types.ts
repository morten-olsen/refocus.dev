type BoardData = { boards: Boards; selected?: string };

type BoardsLoad = () => BoardData;

type BoardsSave = (data: BoardData) => void;

type BoardWidget = {
  type: string;
  data: any;
};

type Board = {
  name: string;
  widgets: {
    [key: string]: BoardWidget;
  };
};

type Boards = {
  [key: string]: Board;
};

export type { Board, Boards, BoardWidget, BoardsLoad, BoardsSave };

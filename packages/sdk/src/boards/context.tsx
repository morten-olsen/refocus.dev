import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { Boards, BoardsLoad, BoardsSave } from './types';

type BoardsContextValue = {
  selected?: string;
  boards: Boards;
  addBoard: (name: string) => void;
  setName: (id: string, name: string) => void;
  selectBoard: (id: string) => void;
  removeBoard: (id: string) => void;
  addWidget: (boardId: string, type: string, data: string) => void;
  removeWidget: (boardId: string, widgetId: string) => void;
  updateWidget: (boardId: string, widgetId: string, data: string) => void;
};

type BoardsProviderProps = {
  children: React.ReactNode;
  load: BoardsLoad;
  save: BoardsSave;
};

const BoardsContext = createContext<BoardsContextValue | null>(null);

const BoardsProvider: React.FC<BoardsProviderProps> = ({
  children,
  load,
  save,
}) => {
  const [boards, setBoards] = useState<Boards>(load().boards);
  const [selected, setSelected] = useState<string | undefined>(load().selected);

  const addBoard = useCallback((name: string) => {
    const id = uuid();
    setBoards((currentBoards) => ({
      ...currentBoards,
      [id]: {
        name,
        widgets: {},
      },
    }));
  }, []);

  const setName = useCallback((id: string, name: string) => {
    setBoards((currentBoards) => ({
      ...currentBoards,
      [id]: {
        ...currentBoards[id],
        name,
      },
    }));
  }, []);

  const removeBoard = useCallback((id: string) => {
    setBoards((currentBoards) => {
      const copy = { ...currentBoards };
      delete copy[id];
      return copy;
    });
  }, []);

  const addWidget = useCallback(
    (boardId: string, type: string, data: string) => {
      const id = uuid();
      setBoards((currentBoards) => ({
        ...currentBoards,
        [boardId]: {
          ...currentBoards[boardId],
          widgets: {
            ...currentBoards[boardId].widgets,
            [id]: {
              type,
              data,
            },
          },
        },
      }));
    },
    [],
  );

  const removeWidget = useCallback((boardId: string, widgetId: string) => {
    setBoards((currentBoards) => {
      const copy = { ...currentBoards };
      delete copy[boardId].widgets[widgetId];
      return copy;
    });
  }, []);

  const updateWidget = useCallback(
    (boardId: string, widgetId: string, data: string) => {
      setBoards((currentBoards) => ({
        ...currentBoards,
        [boardId]: {
          ...currentBoards[boardId],
          widgets: {
            ...currentBoards[boardId].widgets,
            [widgetId]: {
              ...currentBoards[boardId].widgets[widgetId],
              data,
            },
          },
        },
      }));
    },
    [],
  );

  const selectBoard = useCallback((id: string) => {
    setSelected(id);
  }, []);

  useEffect(() => {
    save({ boards, selected });
  }, [boards, selected, save]);

  const value = useMemo(
    () => ({
      boards,
      selected,
      addBoard,
      removeBoard,
      addWidget,
      setName,
      removeWidget,
      selectBoard,
      updateWidget,
    }),
    [
      boards,
      selected,
      addBoard,
      removeBoard,
      addWidget,
      setName,
      removeWidget,
      selectBoard,
      updateWidget,
    ],
  );

  return (
    <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>
  );
};

export { BoardsContext, BoardsProvider };

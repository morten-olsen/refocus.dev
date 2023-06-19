import { useContext } from 'react';
import { BoardsContext } from './context';

const useBoards = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useBoards must be used within a BoardsProvider');
  }
  return context.boards;
};

const useSelectedBoard = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useCurrentBoard must be used within a BoardsProvider');
  }
  return context.selected;
};

const useAddWidget = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useAddWidget must be used within a BoardsProvider');
  }
  return context.addWidget;
};

const useRemoveWidget = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useRemoveWidget must be used within a BoardsProvider');
  }
  return context.removeWidget;
};

const useAddBoard = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useAddBoard must be used within a BoardsProvider');
  }
  return context.addBoard;
};

const useRemoveBoard = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useRemoveBoard must be used within a BoardsProvider');
  }
  return context.removeBoard;
};

const useSelectBoard = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useSelectBoard must be used within a BoardsProvider');
  }
  return context.selectBoard;
};

const useUpdateWidget = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useUpdateWidget must be used within a BoardsProvider');
  }
  return context.updateWidget;
};

const useSetBoardName = () => {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error('useSetBoardName must be used within a BoardsProvider');
  }
  return context.setName;
};

export {
  useBoards,
  useSelectedBoard,
  useAddWidget,
  useRemoveWidget,
  useAddBoard,
  useRemoveBoard,
  useSelectBoard,
  useUpdateWidget,
  useSetBoardName,
};

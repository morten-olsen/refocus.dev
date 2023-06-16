import {
  useAddBoard,
  useBoards,
  useRemoveBoard,
  useSelectBoard,
  useSelectedBoard,
} from '@refocus/sdk';
import { IoAddCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { View } from '../../base';
import { Board } from '../board';
import { Tabs } from '../../base/tabs';
import { useCallback } from 'react';

const NotificationBar = styled(View)``;

const App: React.FC = () => {
  const boards = useBoards();
  const selected = useSelectedBoard();
  const selectBoard = useSelectBoard();
  const addBoardAction = useAddBoard();
  const removeBoard = useRemoveBoard();

  const addBoard = useCallback(() => {
    const name = prompt('Board name?');
    if (!name) {
      return;
    }
    addBoardAction(name);
  }, [addBoardAction]);

  return (
    <View>
      <View $f={1}>
        <Tabs value={selected} onValueChange={selectBoard}>
          <Tabs.List>
            {Object.entries(boards).map(([id, board]) => (
              <Tabs.Trigger key={id} value={id}>
                {board.name}
                <Tabs.Close onClick={() => removeBoard(id)} />
              </Tabs.Trigger>
            ))}
            <View
              onClick={addBoard}
              $fr
              $justify="center"
              $items="center"
              $p="md"
              $bg="highlight100"
            >
              <IoAddCircleOutline size={16} />
            </View>
          </Tabs.List>
          {Object.entries(boards).map(([id, board]) => (
            <Tabs.Content key={id} value={id}>
              <Board id={id} board={board} />
            </Tabs.Content>
          ))}
        </Tabs>
      </View>
      <NotificationBar></NotificationBar>
    </View>
  );
};

export { App };

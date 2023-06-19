import {
  useAddBoard,
  useBoards,
  useRemoveBoard,
  useSelectBoard,
  useSelectedBoard,
  useSetBoardName,
} from '@refocus/sdk';
import { IoAddCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { View } from '../../base';
import { Board } from '../board';
import { Tabs } from '../../base/tabs';
import { useCallback, useMemo } from 'react';

const Wrapper = styled(View)`
  height: 100vh;
`;

const Title: React.FC<{ id: string }> = ({ id }) => {
  const boards = useBoards();
  const board = useMemo(() => boards[id], [boards, id]);
  const setName = useSetBoardName();
  return (
    <View
      $fr
      $items="center"
      $gap="sm"
      $u
      as="input"
      value={board.name || ''}
      onChange={(e) => setName(id, e.target.value)}
    />
  );
};

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
    <Wrapper $fc>
      <View $f={1}>
        <Tabs value={selected} onValueChange={selectBoard}>
          <Tabs.List>
            {Object.entries(boards).map(([id, board]) => (
              <Tabs.Trigger key={id} value={id}>
                <Title id={id} />
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
    </Wrapper>
  );
};

export { App };

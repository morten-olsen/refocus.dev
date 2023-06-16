import {
  Board,
  useAddWidget,
  useRemoveWidget,
  useUpdateWidget,
} from '@refocus/sdk';
import { IoAddCircleOutline } from 'react-icons/io5';
import { View } from '../../base';
import { Widget } from '../widget';
import { AddWidgetFromUrl } from '../add-from-url';
import { styled } from 'styled-components';

type BoardProps = {
  board: Board;
  id: string;
};

const Wrapper = styled(View)`
  flex-wrap: wrap;
`;

const ItemWrapper = styled(View)`
  max-width: 400px;
  overflow-y: auto;
  max-height: 500px;
`;

const Board: React.FC<BoardProps> = ({ board, id }) => {
  const setWidgetData = useUpdateWidget();
  const removeWidget = useRemoveWidget();
  const addWidget = useAddWidget();

  return (
    <View>
      <View $p="md">
        <AddWidgetFromUrl onCreate={(type, data) => addWidget(id, type, data)}>
          <AddWidgetFromUrl.Trigger>
            <View $fr $items="center" $p="sm" $gap="sm">
              <IoAddCircleOutline />
              Add from URL
            </View>
          </AddWidgetFromUrl.Trigger>
        </AddWidgetFromUrl>
      </View>
      <Wrapper $fr>
        {Object.entries(board.widgets).map(([widgetId, widget]) => (
          <ItemWrapper key={widgetId}>
            <Widget
              key={widgetId}
              id={widget.type}
              data={widget.data}
              setData={(data) => setWidgetData(id, widgetId, data)}
              onRemove={() => removeWidget(id, widgetId)}
            />
          </ItemWrapper>
        ))}
      </Wrapper>
    </View>
  );
};

export { Board };

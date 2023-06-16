import {
  Board,
  useAddWidget,
  useRemoveWidget,
  useUpdateWidget,
} from '@refocus/sdk';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Masonry, View } from '../../base';
import { Widget } from '../widget';
import { AddWidgetFromUrl } from '../add-from-url';
import { styled } from 'styled-components';

type BoardProps = {
  board: Board;
  id: string;
};

const ItemWrapper = styled(View)`
  overflow-y: auto;
  max-height: 500px;
  max-width: 100%;
  box-shadow: 0 0 4px 0px ${({ theme }) => theme.colors.bg.highlight};
  border-radius: ${({ theme }) => theme.radii.md}px;
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
      <View $p="md">
        <Masonry>
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
        </Masonry>
      </View>
    </View>
  );
};

export { Board };

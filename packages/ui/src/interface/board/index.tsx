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
import { CreateWidget } from '../create-widget';

type BoardProps = {
  board: Board;
  id: string;
};

const ItemWrapper = styled(View)`
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radii.md}px;
`;

const Wrapper = styled(View)`
  height: 100%;
`;

const Board: React.FC<BoardProps> = ({ board, id }) => {
  const setWidgetData = useUpdateWidget();
  const removeWidget = useRemoveWidget();
  const addWidget = useAddWidget();

  return (
    <Wrapper>
      <View $p="md">
        <AddWidgetFromUrl onCreate={(type, data) => addWidget(id, type, data)}>
          <AddWidgetFromUrl.Trigger>
            <View $fr $items="center" $p="sm" $gap="sm">
              <IoAddCircleOutline />
              Add from URL
            </View>
          </AddWidgetFromUrl.Trigger>
        </AddWidgetFromUrl>
        <CreateWidget onCreate={(type, data) => addWidget(id, type, data)}>
          <CreateWidget.Trigger>
            <View $fr $items="center" $p="sm" $gap="sm">
              <IoAddCircleOutline />
              Create
            </View>
          </CreateWidget.Trigger>
        </CreateWidget>
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
    </Wrapper>
  );
};

export { Board };

import { widgets } from '@refocus/widgets';
import { FocusProvider, Interface } from '@refocus/ui';

const App: React.FC = () => {
  return (
    <FocusProvider widgets={widgets as any}>
      <Interface.App />
    </FocusProvider>
  );
};

export default App;

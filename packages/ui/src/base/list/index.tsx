import { AnimatePresence, motion } from 'framer-motion';
import { View } from '../view';

type ListProps = {
  children: React.ReactNode;
};

const List = ({ children }: ListProps) => {
  return (
    <View $fc $gap="sm" $p="sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </View>
  );
};

export { List };

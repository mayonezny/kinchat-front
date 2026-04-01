import { AnimatePresence, motion } from 'framer-motion';
import './error-message.scss';

export const ErrorMessage = ({ message }: { message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.span
        className="error"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {message}
      </motion.span>
    )}
  </AnimatePresence>
);

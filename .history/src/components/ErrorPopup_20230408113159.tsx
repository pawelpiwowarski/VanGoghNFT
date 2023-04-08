import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ErrorPopup({ error, setError }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <AnimatePresence>
      {(error || isOpen) && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg w-1/3">
            <div className="text-red-500 font-bold text-xl p-4 border-b-2">
              Error
            </div>
            <div className="text-gray-500 p-4">{error?.message}</div>
            <div className="bg-gray-100 p-4 flex justify-end">
              <button
                className="text-red-500 font-bold"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

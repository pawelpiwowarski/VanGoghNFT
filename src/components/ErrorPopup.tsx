import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorPopupProps {
  error: Error | null;
}

export default function ErrorPopup({ error }: ErrorPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
 // limit th eror message to 100 characters
  const errorMessage = error?.message.slice(0, 100);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {error && isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white shadow-lg rounded-lg w-1/3">
            <div className="text-white-500 font-bold text-xl p-4 border-b">
              There has been an error 😔
            </div>
            <div className="text-red-500 p-4">{errorMessage}</div>
            <div className="bg-gray-100 p-4 flex justify-end">
              <button
                className="text-black-500 font-bold"
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

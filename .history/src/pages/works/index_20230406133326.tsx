import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
}

const ImageModal: React.FC<{ selectedImage: string; setSelectedImage: (imageUrl: string) => void }> = ({
  selectedImage,
  setSelectedImage,
}) => {
  if (!selectedImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
        <motion.div
          className="bg-white rounded-lg shadow-lg z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="absolute top-0 right-0 m-3 text-gray-700 hover:text-gray-900"
            onClick={() => setSelectedImage('')}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M18.292 5.292a1 1 0 0 0-1.414 0L12 10.586 7.707 6.293a1 1 0 1 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 0 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.292-4.292a1 1 0 0 0 0-1.416z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-3 h-96 w-96">
            <Image src={`/images/${selectedImage}`} alt={selectedImage} width={600} height={400} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
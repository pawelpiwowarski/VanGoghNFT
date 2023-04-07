import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const MotionImg = motion.img;


interface Props {
  images: string[];
}

const ImageModal: React.FC<{ selectedImage: string; setSelectedImage: (imageUrl: string) => void }> = ({
  selectedImage,
  setSelectedImage,
}) => {
  if (!selectedImage) return null;

  const handleClose = () => {
    setSelectedImage('');
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'visible';
    }
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50" onClick={handleBackgroundClick}></div>
      <div className="bg-white rounded-lg shadow-lg z-10">
        <button className="absolute top-0 right-0 m-3 text-gray-700 hover:text-gray-900" onClick={handleClose}>
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              d="M18.292 5.292a1 1 0 0 0-1.414 0L12 10.586 7.707 6.293a1 1 0 1 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 0 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.292-4.292a1 1 0 0 0 0-1.416z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="p-2 h-96 w-96">
          <img src={`/images/${selectedImage}`} alt={selectedImage} />
        </div>
      </div>
    </div>
  );
};
const MotionDiv = motion.div;

import { useHistory } from 'react-router-dom';


const ImageGalleryPage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const imagesPerPage = 9;
  const history = useHistory();

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const handlePageChange = (pageNumber) => {
    // Add a fade-out animation before redirecting to the next page
    setPage(pageNumber);
    history.push(`/page/${pageNumber}`, { transition: 'fade' });
  };

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const displayedImages = images.slice(startIndex, endIndex);

  return (
    <motion.div
      key="ImageGalleryPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ... */}
      <div className="flex justify-center items-center py-4">
        {Array(Math.ceil(images.length / imagesPerPage))
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 mx-1 ${
                i + 1 === page ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </motion.div>
  );
};

export default ImageGalleryPage;








export function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');
  const fileNames = fs.readdirSync(imagesDirectory);
  const images = fileNames.filter((fileName) => fileName.endsWith('.png'));
  return {
    props: {
      images,
    },
  };
}

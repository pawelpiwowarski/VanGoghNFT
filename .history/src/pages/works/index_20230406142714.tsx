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



const ImageGalleryPage: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const imagesPerPage = 9;

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden'; // prevent scrolling
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    // add smooth scroll to top


    // use framer motion to animate scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });


  };

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const displayedImages = images.slice(startIndex, endIndex);

  return (
    <MotionDiv key="ImageGalleryPage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    <div>

      <div className="flex justify-center items-center text-center">
        <Head>
          <title>VanGogh Collection</title>
        </Head>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-6">
          <h1 className="text-4xl font-bold mb-4">VanGogh Stable Diffusion Collection</h1>
          <p className="text-lg mb-8">
            What if VanGogh painted till this day? Get a glimpse of the possible with this gallery! This 96 images are
            created using Stable Diffusion V2, and you can claim each picture by clicking on it using a Matic wallet for
            free.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-32">
        <div className="-m-1 flex flex-wrap md:-m-2">
          {displayedImages.map((image, index) => (
            <div key={index} className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <MotionImg
                  alt={image}
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`/images/${image}`}
                  onClick={() => handleImageClick(image)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <div className="flex justify-center items-center py-4">
        {Array(Math.ceil(images.length / imagesPerPage))
          .fill(0)
          .map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 mx-1 ${
                i + 1 === page ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => handlePageChange(i + 1)

                
              }
      
            >
              {i + 1}
            </button>
          ))}
      </div>
      
    </div>

    </MotionDiv>
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

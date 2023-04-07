import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

interface Props {
  images: string[];
}

const ImageModal: React.FC<{ selectedImage: string; setSelectedImage: (imageUrl: string) => void }> = ({
  selectedImage,
  setSelectedImage,
}) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg z-10">
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
        <div className="p-3 h-80 w-80 ">
          <img src={`/images/${selectedImage}`} alt={selectedImage} />
        </div>
      </div>
    </div>
  );
};

const ImageGalleryPage: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      <Head>
        <title>Image Gallery</title>
      </Head>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
          {images.map((image, index) => (
            <div key={index} className="flex w-1/3 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt={image}
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`/images/${image}`}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </div>
  );
};

export default ImageGalleryPage;




export async function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');
  const fileNames = fs.readdirSync(imagesDirectory);
  const images = fileNames.filter((fileName) => fileName.endsWith('.png'));
  return {
    props: {
      images,
    },
  };
}
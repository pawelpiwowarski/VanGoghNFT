import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

interface Props {
  images: string[];
}

const ImageGallery: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative h-64" onClick={() => handleImageClick(image)}>
          <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
        </div>
      ))}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 h-screen w-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <Image src={`/images/${selectedImage}`} alt={selectedImage} width={600} height={400} />
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';

export default function ImageGalleryPage({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState('');

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
                  className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                  src={`/images/${image}`}
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed z-10 top-0 left-0 h-full w-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="relative max-w-xl max-h-full">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setSelectedImage('')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 101.414-1.414L11.414 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute top-0 left-0 h-full w-full">
              <img
                src={`/images/${selectedImage}`}
                className="max-h-full max-w-full object-contain"
                alt={selectedImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


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

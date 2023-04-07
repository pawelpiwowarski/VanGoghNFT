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

  const handleClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative h-64">
          <button onClick={() => handleClick(image)}>
            <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
          </button>
        </div>
      ))}
      {selectedImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
          <button className="absolute top-0 right-0 m-4 text-white" onClick={handleClose}>
            Close
          </button>
          <Image src={`/images/${selectedImage}`} alt={selectedImage} width={800} height={600} />
        </div>
      )}
    </div>
  );
};

export default function ImageGalleryPage({ images }: Props) {
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
                <button onClick={() => setSelectedImage(image)}>
                  <img
                    alt={image}
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src={`/images/${image}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

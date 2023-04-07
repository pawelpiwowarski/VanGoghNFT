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
        <div
          key={index}
          className="relative h-64"
          onClick={() => setSelectedImage(`/images/${image}`)}
        >
          <Image
            src={`/images/${image}`}
            alt={image}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
      {selectedImage && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-2/3 h-2/3">
            <button
              className="absolute top-0 right-0 p-2 m-2 rounded-full text-gray-100 bg-gray-900 hover:bg-gray-800"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <Image
              src={selectedImage}
              alt="Selected Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
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

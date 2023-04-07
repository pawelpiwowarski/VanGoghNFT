import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface Props {
  images: string[];
}

const ImageGallery: React.FC<Props> = ({ images }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <div className="relative h-0 overflow-hidden pb-2/3">
            <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-white bg-opacity-75">
            <p className="text-gray-800 text-sm truncate">{image}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ImageGalleryPage({ images }: Props) {
  return (
    <div>
      <Head>
        <title>Image Gallery</title>
      </Head>
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Image Gallery</h1>
        <ImageGallery images={images} />
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

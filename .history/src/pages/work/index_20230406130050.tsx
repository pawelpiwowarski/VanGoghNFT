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
          <a href={`/images/${image}`} target="_blank" rel="noopener noreferrer">
            <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50">
              <p className="text-white text-lg font-bold">View Image</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default function ImageGalleryPage({ images }: Props) {
  return (
    <div>
      <Head>
        <title>Clickable Image Gallery</title>
      </Head>
      <ImageGallery images={images} />
    </div>
  );
}

export async function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images'); // Replace with your own directory path
  const fileNames = fs.readdirSync(imagesDirectory);
  const images = fileNames.filter((fileName) => fileName.endsWith('.png'));
  return {
    props: {
      images,
    },
  };
}

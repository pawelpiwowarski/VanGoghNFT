import Head from 'next/head';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface Props {
  images: string[];
  clickable?: boolean;
}

const ImageGallery: React.FC<Props> = ({ images, clickable = false }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative h-64">
          {clickable ? (
            <a href={`/images/larger/${image}`}>
              <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
            </a>
          ) : (
            <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
          )}
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
      <ImageGallery images={images} clickable />
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

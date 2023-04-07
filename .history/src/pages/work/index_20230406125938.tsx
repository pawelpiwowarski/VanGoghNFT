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
        <div key={index} className="relative" style={{ height: "300px" }}>
          <Image src={`/images/${image}`} alt={image} layout="fill" objectFit="cover" />
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

import { NextPage } from 'next';
import Image from 'next/image';
import { getImageUrls } from '../utils/images';

const GalleryPage: NextPage = () => {
  const imageUrls = getImageUrls('/images', '.png');

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <Image
                alt={`Gallery Image ${index}`}
                className="block h-full w-full rounded-lg object-cover object-center"
                src={url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;

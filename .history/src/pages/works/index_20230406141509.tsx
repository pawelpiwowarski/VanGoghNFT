import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const ImageGalleryPage: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  return (
    <MotionDiv key="ImageGalleryPage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div>
        <div className="flex justify-center items-center text-center">
          <Head>
            <title>VanGogh Collection</title>
          </Head>
          <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <h1 className="text-4xl font-bold mb-4">VanGogh Stable Diffusion Collection</h1>
            <p className="text-lg mb-8">
              What if VanGogh painted till this day? Get a glimpse of the possible with this gallery! This 96 images are created
              using Stable Diffusion V2, and you can claim each picture by clicking on it using a Matic wallet for free.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {images.map((image, index) => (
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
      </div>
    </MotionDiv>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
};

export default MyApp;

import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout  from '~/components/Layout';
import { api } from '~/utils/api';
import {FilterMenu} from '~/components/FilterMenu';
import { LoadingAnimation } from '~/components/LoadingAnimation';

const MotionImg = motion.img;


interface Props {
  images: string[];
}


const MotionDiv = motion.div;



const ImageGalleryPage: React.FC<Props> = ({ images }) => {
  const [isClient, setIsClient] = useState(false);
  const [showClaimed, setShowClaimed] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  

  

  useEffect(() => {
    setIsClient(true);
    

  
  }, []);




  const {data: AllWorks} = api.work.getAll.useQuery()


  const claimedIds =showAll? AllWorks?.map((work)=>work.id) :AllWorks?.filter((work) => showClaimed ? work.claimed : !work.claimed).map((work) => work.id);


  const [page, setPage] = useState(1); // get current page from localStorage or default to 1

  const imagesPerPage = 9;


  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });


    const motionDiv = document.getElementById('motion-div');

    // check if the div has been rendered


    if (motionDiv) {
      motionDiv.style.opacity = '0'; // Hide the div

      setTimeout(() => {
        motionDiv.style.opacity = '1'; // Show the div and animate it
      }, 100); // Wait a short time to give the window time to scroll to the top
    }


  

  };

  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const displayedImages = images.slice(startIndex, endIndex);

  const filteredImages = displayedImages.filter((image) => {
    const id = image.split(".")[0];
    return claimedIds?.includes(id as string);
  });

  useEffect(() => {
    // check if all images have been loaded
    const allImagesLoaded = filteredImages.every(() => imagesLoaded);
    if (allImagesLoaded) {
      // update the state to indicate that all images have been loaded
      setImagesLoaded(true);
    }
  }, [filteredImages, imagesLoaded]);
  




  return (
    <Layout>
    <div className="container mx-auto max-w-full">
    <MotionDiv
  id="motion-div"
  key={`page-${page}`}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, y: 0, transition: { ease: "easeOut", duration: 1 } }}
  exit={{ opacity: 0, y: -50 }}
>
    <div>

      <div className="flex justify-center items-center text-center">

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-6">
          <h1 className="text-4xl font-bold mb-4">VanGogh Stable Diffusion Collection</h1>
          <p className="text-lg mb-8">
            What if VanGogh painted till this day? Get a glimpse of the possible with this gallery! This 96 images are
            created using Stable Diffusion V2, and you can claim each picture by clicking on it using a Matic wallet for
            free.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-5 lg:px-32 sm:flex-col">
      <div className="flex justify-end pb-3 font-bold text-xl">
  <FilterMenu showClaimed={showClaimed} setShowClaimed={setShowClaimed} showAll={showAll} setshowAll={setShowAll}/>
</div>

        <div className="-m-1 flex flex-wrap sm:flex-no-wrap md:-m-2">
          {filteredImages.map((image, index) => (

            <div key={index} className="flex w-1/3 flex-wrap">
              <a href={ `/works/${image.split(".")[0]?? "" }`   } rel="preload">
              <div className="w-full p-1 md:p-2">
              <MotionImg
        alt={image}
        className="block h-full w-full rounded-lg object-cover object-center"
        src={`/images/${image}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onLoad={() => {
          // set a flag to indicate that this image has been loaded
          setImagesLoaded(true);
        }}

      />
              </div>
              </a>
            </div>
       

          ))}
        </div>
      </div>
{  !showClaimed && !showAll ?<>      <div className="flex justify-center items-center py-4 font-bold text-2xl">
  <h1>All of the tokens have been claimed  😔</h1>
 </div></>:
      <div className="flex justify-center items-center py-4">
        {Array(Math.ceil(images.length / imagesPerPage))
          .fill(0)
          .map((_, i) => (
            <button
            id="page-button"
            key={i}
            className={`py-2 mx-1 ${
              i + 1 === page ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-200'
            } ${
              // Add px-2 class for mobile screens (client-side only)
              isClient && window.innerWidth <= 768 ? 'px-2' : 'px-4'
            }`}
            onClick={() => handlePageChange(i + 1)
              
            
            }
          >
            {i + 1}
          </button>
          
          ))}
      </div>
}
      
    </div>

    </MotionDiv>

    </div>
    </Layout>
  );
};


export default ImageGalleryPage;




export function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');
  const fileNames = fs.readdirSync(imagesDirectory);
  const images = fileNames.filter((fileName) => fileName.endsWith('.png'));
  return {
    props: {
      images,
    },
  };
}

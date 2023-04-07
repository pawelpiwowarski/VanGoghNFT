import { useRouter } from 'next/router';
import {useState} from 'react';
import { api } from '../../utils/api';


const Work = () => {
  const router = useRouter();
  const { id } = router.query;
  let image_url = undefined;

  if (id && typeof id === 'string') {

    image_url = `/images/${id}.png`;
    const {data} = api.work.getByID.useQuery({ id: id });
    console.log(data);

   
  }


  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={image_url} alt={data.title} className="w-full" />
        <div className="px-4 py-2">
          <h2 className="font-bold text-2xl mb-2">{data.title}</h2>
          <p className="text-gray-600">{data.year}</p>
        </div>
      </div>
    </div>
  );

};

export default Work;

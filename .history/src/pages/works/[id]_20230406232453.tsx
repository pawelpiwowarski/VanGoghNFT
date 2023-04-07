import { useRouter } from 'next/router';
import {useState} from 'react';
import { api } from '../../utils/api';


const Work = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image_url, setImageUrl] = useState('');

  if (id && typeof id === 'string') {

    setImageUrl(`/images/${id}.png`);




   
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


export async function getServersideProps() {
  const { data } = await api.work.getAll();
  return {
    props: {
      data,
    },
  };
}
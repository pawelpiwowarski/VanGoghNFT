import { useRouter } from 'next/router';
import {useState} from 'react';
import { api } from '../../utils/api';


const Work = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [image_url, setImageUrl] = useState('');

  if (id && typeof id === 'string') {

    setImageUrl(`/images/${id}.png`);




   
  }


  return (
    <div className="max-w-2xl mx-auto">

    </div>
  );

};

export default Work;


export function getServerSideProps(context: any) {

console.log(context.query.id);
const {data} =  api.work.getByID.useQuery({id: context.query.id});
console.log(data);


  return {
    props: {
      data,
    },
  };
}
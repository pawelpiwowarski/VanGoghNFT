import type  { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import { useState } from 'react';

const Work = (props: {id: string}) => {

    const {data} = api.work.getByID.useQuery({id: props.id})

    const [imageurl, setImageurl] = useState(`images/${props.id}.png`)
    const [metadata, setData] = useState(data)


    
    return (
        <div>
</div>
    )
}

export default Work






export  function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;


  return {
    props: {

id
        
    }, // will be passed to the page component as props
  };
}

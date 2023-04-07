import type { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import { useState } from 'react';
import Image from 'next/image';

const Work = (props: { id: string }) => {
  const { data } = api.work.getByID.useQuery({ id: props.id });
  const [imageurl, setImageurl] = useState(`images/${props.id}.png`);
  const [metadata, setData] = useState(data);

 if (data) {
    setData(data);
 } 

  return (
    <>
      {metadata?.year && metadata.title && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-bold">{metadata.title}</h2>
            <p className="text-gray-500 text-sm">{metadata.year}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Work;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

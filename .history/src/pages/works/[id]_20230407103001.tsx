import type { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import Image from 'next/image';

const Work = (props: { id: string }) => {
  const result = api.work.getByID.useQuery({ id: props.id });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const { data } = result;

  return (
    <>
      {data?.year && data?.title && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-60">
            <Image src={`/images/${props.id}.png`} alt={data?.title} layout="fill" objectFit="cover" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">{data?.title}</h2>
            <p className="text-gray-500 text-sm">{data?.year}</p>
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

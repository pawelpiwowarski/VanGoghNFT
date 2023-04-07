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
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="relative  bg-no-repeat bg-cover">
              <Image src={`/images/${props.id}.png`} alt={data?.title} height={512} width={512} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
              <p className="text-gray-500 text-sm">{data?.year}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
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

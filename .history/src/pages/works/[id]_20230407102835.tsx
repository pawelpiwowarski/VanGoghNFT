import type { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import Image from 'next/image';
const Work = (props: { id: string }) => {
  const result = api.work.getByID.useQuery({ id: props.id });
  if (result.isLoading) return <div>Loading...</div>;




  return (
    <>
      {result.data?.year && result.data?.title && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
  <Image src={`images/${props.id}.png`} alt={result.data?.title} height={500} width={500} />

          <div className="p-4">
            <h2 className="text-lg font-bold">{result.data?.title}</h2>
            <p className="text-gray-500 text-sm">{result.data?.year}</p>
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

import type  { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';


const Work = (props: {id: string}) => {

    console.log(props.id)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
</div>
    )
}

export default Work






export  function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  if (id) {
  const work = api.work.getByID.useQuery({id: id as string})
  console.log(work)
  }

  return {
    props: {

id
        
    }, // will be passed to the page component as props
  };
}

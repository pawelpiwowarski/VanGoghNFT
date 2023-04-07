import type  { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';


const Work = (props: {id: string}) => {

    const {data} = api.work.getByID.useQuery({id: props.id})
    console.log(data)

    console.log(props.id)
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

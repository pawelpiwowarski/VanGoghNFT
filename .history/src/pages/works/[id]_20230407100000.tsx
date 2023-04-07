import type  { GetServerSidePropsContext } from 'next';



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
  console.log(id);
  return {
    props: {

id
        
    }, // will be passed to the page component as props
  };
}

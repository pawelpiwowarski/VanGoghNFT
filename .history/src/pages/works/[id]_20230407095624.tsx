import type  { GetServerSidePropsContext } from 'next';



const Work = (props: any) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
</div>
    )
}

export default Work






export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  console.log(id);
  return {
    props: {}, // will be passed to the page component as props
  };
}

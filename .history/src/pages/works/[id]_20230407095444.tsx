



const Work = (props: any) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
</div>
    )
}

export default Work




export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
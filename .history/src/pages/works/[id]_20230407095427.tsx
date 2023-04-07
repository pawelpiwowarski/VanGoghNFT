



const Work = (props: any) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
</div>
    )
}

export default Work




export async getServerSideProps(context: any) => {
    const { id } = context.query
    const res = await fetch(`https://.../posts/${id}`)
    const post = await res.json()

    return {
        props: {
            post,
        },
    }
}
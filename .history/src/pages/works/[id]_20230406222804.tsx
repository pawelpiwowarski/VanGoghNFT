
const router = useRouter()

const Work = () => {

    const { id } = router.query
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work
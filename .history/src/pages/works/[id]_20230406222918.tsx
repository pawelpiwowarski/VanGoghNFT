
import { useRouter } from 'next/router'



const Work = () => {

    const router = useRouter()
    const { id } = router.query
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


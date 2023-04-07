
import { useRouter } from 'next/router'



export const Work = () => {

    const router = useRouter()
    const { id } = router.query
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }





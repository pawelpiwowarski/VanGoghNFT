
import { useRouter } from 'next/router'
import {api} from '../../utils/api'



const Work = () => {

    const router = useRouter()
    const { id } = router.query
    if (id && typeof id === 'string') {

    const work = api.work.getById.useQuery({id: id})
    }
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


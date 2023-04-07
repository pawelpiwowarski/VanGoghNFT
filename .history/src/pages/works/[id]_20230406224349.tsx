
import { useRouter } from 'next/router'
import {api} from '../../utils/api'



const Work = () => {

    const router = useRouter()
    const { id } = router.query

    const work = await api.work.getById({id: id})

    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRouter } from 'next/router'
import {api} from '../../utils/api'



const Work = () => {

    const router = useRouter()
    const { id } = router.query
    if (id && typeof id === 'string') {

        const {data} = api.work.getByID.useQuery({id: id})

        


    }
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


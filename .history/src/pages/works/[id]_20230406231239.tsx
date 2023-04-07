/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRouter } from 'next/router'
import {api} from '../../utils/api'
import { env } from "~/env.mjs";


const Work = () => {

    const router = useRouter()
    const { id } = router.query


    if (id && typeof id === 'string') {
        
        const image_url = env.NEXTAUTH_URL + '/images' + id + '.png'
        const {data} = api.work.getByID.useQuery({id: id})
        




    }
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


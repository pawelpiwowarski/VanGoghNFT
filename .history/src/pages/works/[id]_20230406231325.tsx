/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRouter } from 'next/router'
import {api} from '../../utils/api'
import { env } from "~/env.mjs";


const Work = () => {

    const router = useRouter()
    const { id } = router.query


    if (id && typeof id === 'string') {
        
        const image_url = + '/images' + id + '.png'
        const {data} = api.work.getByID.useQuery({id: id})
        

        console.log(image_url)


    }
    
    return (
        <div>
        <h1>Work {id}</h1>
        </div>
    )
    }

export default Work


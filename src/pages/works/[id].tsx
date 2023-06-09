

import type { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import Image from 'next/image';
import Layout from '~/components/Layout';

import { usePrepareContractWrite, useContractWrite,useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import ErrorPopup from '~/components/ErrorPopup';
import { useAccount } from 'wagmi'
import { useEffect} from 'react';
import { LoadingAnimation } from '~/components/LoadingAnimation';


const Work = (props: { id: string }) => {
  const result = api.work.getByID.useQuery({ id: props.id });

  const contract_address = "0x4C1b52ef8913562B753ceBEE33d224eF5f960729" 
  const { address, isConnecting, isDisconnected } = useAccount()
  const {data: has_user_claimed} = api.work.hasAddressClaimed.useQuery({ address: address as string});

  const claim = api.work.claim.useMutation();



  const {config,error: prepareError,
    isError: isPrepareError} = usePrepareContractWrite({
    address: contract_address,
    abi: [
      {
        name: 'safeMint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        outputs: [],
      }

    ],
    functionName: 'safeMint',
    args:[ethers.BigNumber.from(props.id)  ],
    enabled: Boolean(props.id),
  });


  
  const { data: ContractData, write,  error, isError } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: ContractData?.hash,
  })

  useEffect(() => {
    if (isSuccess) {
      
      claim.mutate({ id: props.id, address: address as string, contract_address });
    }
  }, [isSuccess]);



  
 
  if (result.isLoading) {
    return  (
    <Layout>
    <LoadingAnimation />;
    </Layout>
    )
  }

  
  const { data } = result;
  return (
    <Layout>
    <>
      {data?.year && data?.title && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="relative  bg-no-repeat bg-cover">
              <Image src={`/images_full/${props.id}.png`} alt={data?.title} height={512} width={512} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
              <p className="text-gray-500 text-sm">{data?.year}</p>
              { !data?.claimed && !isLoading && !isSuccess && 
              <button disabled={Boolean(has_user_claimed)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
              write?.()
      

                
              } }
              >
                {Boolean(has_user_claimed) ? "You have already claimed a work 😶‍🌫️" : "Claim Now"}

              </button>  
              
          
              
}
{data?.claimedBy && data.claimed && (
                <div className="mt-4">
                  <h2 className="text-xl font-medium mb-2">Claimed by:</h2>
                  <a href={`https://polygonscan.com/address/${data.claimedBy}`} target="_blank" rel="noreferrer">
                  <p>{data.claimedBy}</p>
                  </a>
                  {data.claimedAt && data.claimed && (
                    <p className="text-gray-500">on {new Date(data.claimedAt).toLocaleString()}</p>
                  )}
                </div>
              )}
{data?.OpenSeaLink && data.claimed && (

                <div className="mt-4">
                  <a href={data?.OpenSeaLink} target='_blank'> 
                  <h2 className="text-xl font-medium mb-2">View on OpenSea:</h2>
                  </a>
                  </div>
                    )}
  
{isLoading && (
                <div className="py-2 px-4 mt-4">
    <div role="status">
    <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </div>
                </div>
              )}

{isSuccess  && (
        <div className='text-green-500 text-2xl font-bold '>
          Successfully claimed your NFT! 💚
          <div>
            <a href={`https://polygonscan.com/tx/${ContractData?.hash as string}`}>View on PolygonScan </a>
          </div>
        </div>
      )}

           
              
{(isError) && (

              <ErrorPopup error={prepareError || error} />

      )}

            </div>
          </div>
        </div>
      )}
    </>

    </Layout>
  );
};

export default Work;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

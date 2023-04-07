import type { GetServerSidePropsContext } from 'next';
import { api } from '~/utils/api';
import { useState } from 'react';
import Image from 'next/image';

const Work = (props: { id: string }) => {
  const result = api.work.getByID.useQuery({ id: props.id });



 console.log(result);

  return (
    <>
     
    </>
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

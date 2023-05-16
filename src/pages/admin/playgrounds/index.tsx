/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import AdminPlaygrounds from '@/components/Admin/Playgrounds';
import { useAdminStore } from '@/stores/admin';
import { getSession } from 'next-auth/react';

export default function Playgrounds() {
  const { playgrounds }: any = useAdminStore();
  
  return (
    <div className='bg-gray-100 h-screen px-5'>
      <AdminPlaygrounds playgrounds={playgrounds} />
    </div>
  )
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

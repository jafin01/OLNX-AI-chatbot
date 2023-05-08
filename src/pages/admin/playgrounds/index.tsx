/* eslint-disable react-hooks/exhaustive-deps */
import AdminPlaygrounds from '@/components/Admin/Playgrounds';
import { LoadingPage } from '@/components/Loading';
import { loadAdmin } from '@/services/admin/admin.services';
import { useAdminStore } from '@/stores/admin';
import { useQuery } from '@tanstack/react-query';
import { getSession, useSession } from 'next-auth/react';
import React, { useState } from 'react'

function Playgrounds() {
  // const [playgrounds, setPlaygrounds] = useState([]);

  const { playgrounds }: any = useAdminStore();
  
  // const { data: session } = useSession();

  // const { isLoading }: { isLoading: boolean, error: any, data: any} = useQuery({
  //   queryKey: ["fetch-admin"],
  //   queryFn: () => {
  //     return loadAdmin({ token: session?.user?.token || "" });
  //   },
  //   onSuccess: (data) => {
  //     console.log('hi')
  //     setPlaygrounds(data.playgrounds.data);
  //   },
  // });
  
  return (
    <div className='bg-gray-100 h-screen px-5'>
      {/* {isLoading ? (
        <LoadingPage />
      ) :  */}
      <AdminPlaygrounds playgrounds={playgrounds} />
      {/* }   */}
    </div>
  )
}

export default Playgrounds;

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

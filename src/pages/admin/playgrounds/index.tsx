/* eslint-disable react-hooks/exhaustive-deps */
import AdminPlaygrounds from '@/components/Admin/Playgrounds';
import { LoadingPage } from '@/components/Loading';
import { loadAdmin } from '@/services/admin/admin.services';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Playgrounds() {
  const [playgrounds, setPlaygrounds] = useState([]);
  // const [token, setToken] = useState<string>('');
  // const [loading, setLoading] = useState(false);
  
  const { push } = useRouter();
  const { data: session } = useSession();

  const { isLoading, error, data }: { isLoading: boolean, error: any, data: any} = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: () => {
      return loadAdmin({ token: session?.user?.token || "" });
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (data) => {
      console.log('hi')
      setPlaygrounds(data.playgrounds.data);
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setPlaygrounds(data.playgrounds.data);
  //   } else if (error) {
  //     console.log(error);
  //   }
  // }, [data, error]);

  // useEffect(() => {
  //   const token = Cookies.get('token') || '';
  //   setToken(token);
  // })
  
  return (
    <div className='bg-gray-100 h-screen px-5'>
      {isLoading ? (
        <LoadingPage />
      ) : 
      <AdminPlaygrounds playgrounds={playgrounds} />
      }  
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

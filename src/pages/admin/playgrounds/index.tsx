/* eslint-disable react-hooks/exhaustive-deps */
import AdminPlaygrounds from '@/components/Admin/Playgrounds';
import { LoadingPage } from '@/components/Loading';
import { loadAdmin } from '@/services/admin/admin.services';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Playgrounds() {
  const [playgrounds, setPlaygrounds] = useState([]);
  // const [loading, setLoading] = useState(false);
  
  const { push } = useRouter();

  const { isLoading, error, data }: { isLoading: boolean, error: any, data: any} = useQuery({
    queryKey: ["fetch-admin"],
    queryFn: loadAdmin,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setPlaygrounds(data.playgrounds.data);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
  }, []);
  
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

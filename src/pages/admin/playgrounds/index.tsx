/* eslint-disable react-hooks/exhaustive-deps */
import AdminPlaygrounds from '@/components/Admin/Playgrounds';
import { LoadingPage } from '@/components/Loading';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Playgrounds() {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { push } = useRouter();

  async function loadAdmin() {
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      })
      .then((res: any) => {
        setPlaygrounds(res.data.playgrounds.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (!window.localStorage.getItem("accessToken")) {
      push("/login");
    }
    // push(route)
    loadAdmin();
  }, []);
  
  return (
    <div className='bg-gray-100 h-screen px-5'>
      {loading ? (
        <LoadingPage />
      ) : 
      <AdminPlaygrounds playgrounds={playgrounds} />
      }  
    </div>
  )
}

export default Playgrounds;

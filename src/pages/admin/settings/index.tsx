import AdminSettings from '@/components/Admin/Settings'
import { getSession } from 'next-auth/react';
import React from 'react'

function Settings() {
  return (
    <div className='bg-gray-100 h-screen'>
      <div className='w-full flex justify-center'>
        <AdminSettings className="w-1/2" />
      </div>
    </div>
  )
}

export default Settings;

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

import React from 'react';
import AdminSettings from '@/components/Admin/Settings';
import { getSession } from 'next-auth/react';

export default function Settings() {
  return (
    <div className='bg-gray-100 h-screen'>
      <div className='w-full flex justify-center'>
        <AdminSettings className="w-full md:w-1/2" />
      </div>
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

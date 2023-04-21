import AdminSettings from '@/components/Admin/Settings'
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

export default Settings

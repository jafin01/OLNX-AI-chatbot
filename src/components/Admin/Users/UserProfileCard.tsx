/* eslint-disable @next/next/no-img-element */
import { Badge, Icon } from '@tremor/react';
import React from 'react'
import { FiBox, FiCheck, FiKey, FiMessageSquare, FiSend, FiTrash, FiUser, FiX } from 'react-icons/fi';

export default function UserProfileCard({ modelUser, setModelUser }:{modelUser: {
  user: any,
  isModelOpen: boolean,
}, setModelUser: any }) {

  console.log(modelUser.user)
  return (
    <div>
       {modelUser.user && modelUser.isModelOpen && (
        <div 
          className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50" 
          onClick={() => {
            setModelUser({
              user: null,
              isModelOpen: false,
            })
          }}>
          <div className="absolute shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-3/4 bg-white rounded-2xl">
            <div className="bg-violet-400 h-1/2 w-full rounded-br-[30%] rounded-t-2xl">
              <div className="w-full text-right text-xl">
                <button 
                  type="button" 
                  className="p-5"
                  onClick={() => {
                    setModelUser({
                      user: null,
                      isModelOpen: false,
                    })
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className=" absolute flex justify-center w-full">
                <img 
                  src='https://api.dicebear.com/6.x/lorelei/svg?flip=false' 
                  alt="user" 
                  width={150} 
                  height={150} 
                  className="rounded-full mx-auto"  
                />
              </div>
            </div>
              <div className="flex flex-col gap-3 py-2 items-center h-full">
                <div className="flex items-center gap-2 text-2xl font-semibold text-violet-500">
                  {modelUser.user.name}
                 
                </div>
                <div className="flex items-center gap-2 text-md">
                  <span>{modelUser.user.email}</span>
                  
                </div>
                <div className="flex items-center gap-2">
                <Badge
                    color={modelUser.user.is_admin ? "emerald" : "blue"}
                    icon={modelUser.user.is_admin ? FiKey : FiUser}
                  >
                    {modelUser.user.is_admin ? "Admin" : "User"}
                  </Badge>
                  <Badge
                    color={modelUser.user.email_verified_at ? "emerald" : "rose"}
                    icon={modelUser.user.email_verified_at ? FiCheck : FiX}
                  >
                    {modelUser.user.email_verified_at ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                <Icon
                      icon={FiMessageSquare}
                      variant="simple"
                      color="amber"
                      tooltip="Playgrounds"
                    />
                    <Icon
                      icon={FiBox}
                      variant="simple"
                      color="emerald"
                      tooltip="Templates"
                    />  
                    {!modelUser.user.email_verified_at ? (
                      <Icon
                        icon={FiSend}
                        variant="simple"
                        tooltip="Resend Verification Email"
                        color="violet"
                      />
                    ) : (
                      <Icon
                        icon={FiSend}
                        variant="simple"
                        color="gray"
                        className="text-gray-300"
                      />
                    )}
                    {!modelUser.user.is_admin ? (
                      <Icon
                        icon={FiKey}
                        variant="simple"
                        tooltip="Promote To Admin"
                        color="emerald"
                      />
                    ) : (
                      <Icon
                        icon={FiUser}
                        variant="simple"
                        tooltip="Demote to User"
                        color="blue"
                      />
                    )}
                    <Icon
                      icon={FiTrash}
                      variant="simple"
                      color="rose"
                      tooltip="Delete"
                    />
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

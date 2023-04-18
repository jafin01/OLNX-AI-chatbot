import {
  Badge,
  Button,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FiBox,
  FiCheck,
  FiEye,
  FiKey,
  FiMessageSquare,
  FiSend,
  FiTrash,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

export default function AdminUsers({
  users,
  modelUser,
  setModelUser,
}: {
  users: any,
  modelUser:{
    user:any,
    isModelOpen:boolean
  },
  setModelUser:any
}) {
  const router = useRouter();
  return (
    <Card>
      {modelUser.user && modelUser.isModelOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
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
                    router.push("/admin");
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
                {/* <div className="">{modelUser.user.name}</div> */}
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
            {/* </div> */}
          </div>
        </div>
      )}

      <Title className="flex items-center gap-2">
        <FiUsers />
        <span>Users</span>  
      </Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Email Verified</TableHeaderCell>
            <TableHeaderCell>Admin</TableHeaderCell>
            <TableHeaderCell>Created</TableHeaderCell>
            <TableHeaderCell>Updated</TableHeaderCell>
            <TableHeaderCell>Navigate</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => {
            return (
              <TableRow className="hover:bg-gray-100" key={user.id} onClick={() => router.push(`/admin?user=${user.id}`)}>
                <TableCell>
                  <Text>{user.name}</Text>
                </TableCell>
                <TableCell>
                  <Text>{user.email}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    color={user.email_verified_at ? "emerald" : "rose"}
                    icon={user.email_verified_at ? FiCheck : FiX}
                  >
                    {user.email_verified_at ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    color={user.is_admin ? "emerald" : "blue"}
                    icon={user.is_admin ? FiKey : FiUser}
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
                </TableCell>
                <TableCell>
                  <Text>{new Date(user.updated_at).toLocaleDateString()}</Text>
                </TableCell>
                <TableCell>
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
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    {!user.email_verified_at ? (
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
                    {!user.is_admin ? (
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
                    {/* <Icon icon={FiEye} variant="simple" tooltip="View" /> */}
                    
                    <Icon
                      icon={FiTrash}
                      variant="simple"
                      color="rose"
                      tooltip="Delete"
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

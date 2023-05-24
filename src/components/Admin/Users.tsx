import {
  Badge,
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
  FiKey,
  FiMessageSquare,
  FiSend,
  FiTrash,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

export default function AdminUsers({
  users,
  showUserInfo,
}: {
  users: any,
  showUserInfo: (id: number) => void,
}) {
  const { push } = useRouter();
  return (
    <Card className="z-20">
      <Title className="flex items-center gap-2 z-20">
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
              <TableRow className="hover:bg-gray-100 cursor-pointer" key={user.id}>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Text>{user.name}</Text>
                </TableCell>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Text>{user.email}</Text>
                </TableCell>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Badge
                    color={user.email_verified_at ? "emerald" : "rose"}
                    icon={user.email_verified_at ? FiCheck : FiX}
                  >
                    {user.email_verified_at ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Badge
                    color={user.is_admin ? "emerald" : "blue"}
                    icon={user.is_admin ? FiKey : FiUser}
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </Badge>
                </TableCell>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Text>{new Date(user.created_at).toLocaleDateString()}</Text>
                </TableCell>
                <TableCell onClick={() => showUserInfo(user.id)}>
                  <Text>{new Date(user.updated_at).toLocaleDateString()}</Text>
                </TableCell>
                <TableCell>
                  <Icon
                    icon={FiMessageSquare}
                    variant="simple"
                    color="amber"
                    tooltip="Playgrounds"
                    onClick={() => push(`/admin/playgrounds?userId=${user.id}`)}
                  />
                  <Icon
                    icon={FiBox}
                    variant="simple"
                    color="emerald"
                    tooltip="Templates"
                    onClick={() => push(`/admin/templates?userId=${user.id}`)}
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

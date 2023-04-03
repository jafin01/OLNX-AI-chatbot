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
import {
  FiBox,
  FiCheck,
  FiEye,
  FiKey,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export default function AdminUsers() {
  return (
    <Card>
      <Title className="flex items-center gap-2">
        <FiUsers />
        <span>Users</span>
      </Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Subscription</TableHeaderCell>
            <TableHeaderCell>Admin</TableHeaderCell>
            <TableHeaderCell>Created</TableHeaderCell>
            <TableHeaderCell>Updated</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Text>Harman Kamboj</Text>
            </TableCell>
            <TableCell>
              <Text>admin@olnx.com</Text>
            </TableCell>
            <TableCell>
              <Badge color="emerald" icon={FiCheck}>
                Active
              </Badge>
            </TableCell>
            <TableCell>
              <Badge color="emerald" icon={FiKey}>
                Admin
              </Badge>
            </TableCell>
            <TableCell>
              <Text>2 weeks Ago</Text>
            </TableCell>
            <TableCell>
              <Text>5 minutes Ago</Text>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Icon icon={FiEye} variant="simple" tooltip="View" />
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
                <Icon
                  icon={FiTrash}
                  variant="simple"
                  color="rose"
                  tooltip="Delete"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

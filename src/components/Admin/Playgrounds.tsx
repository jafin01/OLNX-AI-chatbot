import {
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
  FiEye,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

export default function AdminPlaygrounds() {
  return (
    <Card>
      <Title className="flex items-center gap-2">
        <FiMessageSquare />
        <span>Playgrounds</span>
      </Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Created</TableHeaderCell>
            <TableHeaderCell>Updated</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Text>Playground title</Text>
            </TableCell>
            <TableCell>
              <Text>Harman Kamboj</Text>
            </TableCell>
            <TableCell>
              <Text>2 Months Ago</Text>
            </TableCell>
            <TableCell>
              <Text>5 minutes Ago</Text>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Icon icon={FiEye} variant="simple" tooltip="View" />
                <Icon
                  icon={FiUser}
                  variant="simple"
                  color="amber"
                  tooltip="User"
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

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
  FiBox,
  FiEye,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

export default function AdminTemplates() {
  return (
    <Card>
      <Title className="flex items-center gap-2">
        <FiBox />
        <span>Templates</span>
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
              <Text>Template title</Text>
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

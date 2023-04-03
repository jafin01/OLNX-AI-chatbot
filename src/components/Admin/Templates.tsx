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
import Link from "next/link";
import {
  FiBox,
  FiEye,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

export default function AdminTemplates({ templates }: { templates: any }) {
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
          {templates.map((template: any) => {
            return (
              <TableRow className="hover:bg-gray-100" key={template.id}>
                <TableCell>
                  <Text>{template.name}</Text>
                </TableCell>
                <TableCell>
                  <Text>{template.user_id}</Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {new Date(template.created_at).toLocaleDateString()}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {new Date(template.updated_at).toLocaleDateString()}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/playgrounds/${template.id}`} target="_black">
                      <Icon icon={FiEye} variant="simple" tooltip="View" />
                    </Link>

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

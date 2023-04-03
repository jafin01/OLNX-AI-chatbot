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
  FiEye,
  FiMessageSquare,
  FiTrash,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

export default function AdminPlaygrounds({
  playgrounds,
}: {
  playgrounds: any;
}) {
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
          {playgrounds.map((playground: any) => {
            return (
              <TableRow className="hover:bg-gray-100" key={playground.id}>
                <TableCell>
                  <Text>{playground.name}</Text>
                </TableCell>
                <TableCell>
                  <Text>{playground.user_id}</Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {new Date(playground.created_at).toLocaleDateString()}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {new Date(playground.updated_at).toLocaleDateString()}
                  </Text>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      target="_blank"
                      href={`/playgrounds/${playground.id}`}
                    >
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

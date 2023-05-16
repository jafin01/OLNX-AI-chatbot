import { Grid, Card, Flex, Icon, Metric, Text, Button } from "@tremor/react";
import { FiBox, FiMessageSquare, FiUser } from "react-icons/fi";

export default function AdminHome({
  playgrounds,
  templates,
  users,
}: {
  playgrounds: number;
  templates: number;
  users: number;
}) {
  return (
    <Grid numColsSm={2} numColsLg={3} className="gap-6">
      <Card decoration="top" decorationColor={"teal"}>
        <Flex justifyContent="start" className="space-x-4">
          <Icon
            icon={FiMessageSquare}
            variant="light"
            size="xl"
            color={"teal"}
          />
          <div className="truncate">
            <Text>Playgrounds</Text>
            <Metric className="truncate">{playgrounds}</Metric>
          </div>
        </Flex>
      </Card>
      <Card decoration="top" decorationColor={"rose"}>
        <Flex justifyContent="start" className="space-x-4">
          <Icon icon={FiBox} variant="light" size="xl" color={"rose"} />
          <div className="truncate">
            <Text>Templates</Text>
            <Metric className="truncate">{templates}</Metric>
          </div>
        </Flex>
      </Card>
      <Card decoration="top" decorationColor={"lime"}>
        <Flex justifyContent="start" className="space-x-4">
          <Icon icon={FiUser} variant="light" size="xl" color={"lime"} />
          <div className="truncate">
            <Text>Users</Text>
            <Metric className="truncate">{users}</Metric>
          </div>
        </Flex>
      </Card>
    </Grid>
  );
}

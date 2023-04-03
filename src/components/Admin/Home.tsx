import playgrounds from "@/pages/playgrounds";
import templates from "@/pages/templates";
import { Grid, Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { useState } from "react";
import { FiActivity, FiBox, FiUser } from "react-icons/fi";

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
          <Icon icon={FiActivity} variant="light" size="xl" color={"teal"} />
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

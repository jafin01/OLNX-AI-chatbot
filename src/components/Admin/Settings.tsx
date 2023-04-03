import { Button, Card, Tab, TabList, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import {
  FiDollarSign,
  FiSettings,
  FiSliders,
  FiTool,
  FiUser,
} from "react-icons/fi";

export default function AdminSettings() {
  const [tab, setTab] = useState<string>("general");
  return (
    <Card>
      <Title className="mb-6 flex items-center gap-2">
        <FiSettings />
        <span>Settings</span>
      </Title>
      <TabList defaultValue={tab} onValueChange={(value) => setTab(value)}>
        <Tab value="general" text="General" icon={FiTool} />
        <Tab value="free-user" text="Free User" icon={FiUser} />
        <Tab value="paid-user" text="Paid User" icon={FiDollarSign} />
        <Tab value="keys" text="Keys" icon={FiSliders} />
      </TabList>
      <div className="grid gap-2 grid-cols-12"></div>
    </Card>
  );
}

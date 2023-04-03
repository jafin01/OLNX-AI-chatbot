import { Card, TextInput, Title } from "@tremor/react";
import { FiSettings } from "react-icons/fi";

export default function AdminSettings() {
  return (
    <Card>
      <Title className="mb-6 flex items-center gap-2">
        <FiSettings />
        <span>Settings</span>
      </Title>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2"></div>
      </div>
    </Card>
  );
}

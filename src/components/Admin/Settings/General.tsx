import { Button, Text, TextInput } from "@tremor/react";
import { FiSave, FiSliders } from "react-icons/fi";

export default function AdminSettingsGeneral() {
  return (
    <div className="py-6 flex flex-col gap-2">
      <Text>Title</Text>
      <TextInput icon={FiSliders} placeholder="Title" />
      <Text>Description</Text>
      <TextInput icon={FiSliders} placeholder="Description" />
      <div className="text-right mt-6">
        <Button icon={FiSave}>Save</Button>
      </div>
    </div>
  );
}

import { Button, Icon, Text, TextInput, Title } from "@tremor/react";
import {
  FiDollarSign,
  FiGlobe,
  FiKey,
  FiLink,
  FiMail,
  FiSave,
  FiShield,
  FiShoppingBag,
  FiSliders,
} from "react-icons/fi";

export default function AdminSettingsKeys() {
  return (
    <div className="py-6 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Title className="flex items-center gap-2">
          <FiDollarSign />
          <span>Stripe</span>
        </Title>
        <Text>Stripe Public Key</Text>
        <TextInput icon={FiKey} placeholder="Stripe Public Key" />
        <Text>Stripe Secret Key</Text>
        <TextInput icon={FiShield} placeholder="Stripe Secret Key" />
        <Text>Stripe Webhook Key</Text>
        <TextInput icon={FiLink} placeholder="Stripe Webhook Key" />
        <Text>Stripe Product Key</Text>
        <TextInput icon={FiShoppingBag} placeholder="Stripe Product Key" />
      </div>
      <div className="flex flex-col gap-2">
        <Title className="flex items-center gap-2">
          <FiMail />
          <span>Mailgun</span>
        </Title>
        <Text>Mailgun Domain</Text>
        <TextInput icon={FiGlobe} placeholder="Mailgun Domain" />
        <Text>Mailgun Secret</Text>
        <TextInput icon={FiShield} placeholder="Mailgun Secret" />
        <Text>Mailgun Endpoint</Text>
        <TextInput icon={FiLink} placeholder="Mailgun Endpoint" />
      </div>

      <div className="text-right mt-6">
        <Button icon={FiSave}>Save</Button>
      </div>
    </div>
  );
}

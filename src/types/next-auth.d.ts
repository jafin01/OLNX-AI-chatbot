import Nextauth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      stripe_id: string;
      is_admin: boolean;
      token: string;
      is_subscribed: boolean;
    }
  }
}

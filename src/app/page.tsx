import {LandingPage} from "@/components/home/LandingPage";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session;

  return <LandingPage isLoggedIn={isLoggedIn} />;
}

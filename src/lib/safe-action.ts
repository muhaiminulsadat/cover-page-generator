import {createSafeActionClient} from "next-safe-action";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    return e instanceof Error ? e.message : "Something went wrong";
  },
});

export const authActionClient = actionClient.use(async ({next}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return next({ctx: {user: session.user}});
});

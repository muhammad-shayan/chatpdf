import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getUserSubscription } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id!,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard");
  const subscriptionPlan = await getUserSubscription();
  return <Dashboard subscriptionPlan={subscriptionPlan} />;
};

export default Page;

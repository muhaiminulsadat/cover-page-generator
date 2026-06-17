import {getRoleDistribution} from "@/lib/queries/analytics";
import {RoleDistributionChart} from "../RoleDistributionChart";

export async function RoleDistributionSection() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const roleData = await getRoleDistribution();

  return <RoleDistributionChart data={roleData} />;
}

import {getDeviceDistribution, getBrowserDistribution} from "@/lib/queries/analytics";
import {DeviceBrowserCharts} from "../DeviceBrowserCharts";

export async function DeviceBrowserSection() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const [deviceData, browserData] = await Promise.all([
    getDeviceDistribution(),
    getBrowserDistribution(),
  ]);

  return <DeviceBrowserCharts deviceData={deviceData} browserData={browserData} />;
}

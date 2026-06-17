import {getRecentDownloads} from "@/lib/queries/analytics";
import {RecentDownloadsTable} from "../RecentDownloadsTable";

export async function RecentDownloadsSection() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const downloads = await getRecentDownloads(5);

  return <RecentDownloadsTable downloads={downloads} />;
}

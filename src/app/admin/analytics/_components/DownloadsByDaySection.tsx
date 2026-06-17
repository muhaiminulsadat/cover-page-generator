import {getDownloadsByDay} from "@/lib/queries/analytics";
import {DownloadsByDayChart} from "../DownloadsByDayChart";

export async function DownloadsByDaySection() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const downloadsData = await getDownloadsByDay(7);

  return <DownloadsByDayChart data={downloadsData} />;
}

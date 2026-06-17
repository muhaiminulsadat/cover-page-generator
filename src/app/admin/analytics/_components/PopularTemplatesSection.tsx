import {getPopularTemplates} from "@/lib/queries/analytics";
import {PopularTemplatesTable} from "../PopularTemplatesTable";

export async function PopularTemplatesSection() {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag("analytics");

  const templates = await getPopularTemplates(5);

  return <PopularTemplatesTable templates={templates} />;
}

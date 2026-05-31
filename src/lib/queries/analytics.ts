import {db} from "@/db";
import {user, templates, downloadLogs} from "@/db/schema";
import {count, desc, eq, sql} from "drizzle-orm";

export async function getAnalyticsSummary() {
  const [totalUsers] = await db.select({value: count()}).from(user);
  const [totalTemplates] = await db.select({value: count()}).from(templates);
  const [totalDownloads] = await db.select({value: count()}).from(downloadLogs);
  
  return {
    totalUsers: totalUsers.value,
    totalTemplates: totalTemplates.value,
    totalDownloads: totalDownloads.value,
  };
}

export async function getRoleDistribution() {
  return await db
    .select({
      role: user.role,
      count: count(),
    })
    .from(user)
    .groupBy(user.role);
}

export async function getDownloadsByDay(days = 7) {
  return await db
    .select({
      date: sql<string>`DATE(downloaded_at)::text`,
      count: count(),
    })
    .from(downloadLogs)
    .where(sql`downloaded_at > NOW() - INTERVAL '${sql.raw(`${days} days`)}'`)
    .groupBy(sql`DATE(downloaded_at)`)
    .orderBy(sql`DATE(downloaded_at)`);
}

export async function getDeviceDistribution() {
  return await db
    .select({
      device: downloadLogs.deviceType,
      count: count(),
    })
    .from(downloadLogs)
    .groupBy(downloadLogs.deviceType);
}

export async function getBrowserDistribution() {
  return await db
    .select({
      browser: downloadLogs.browser,
      count: count(),
    })
    .from(downloadLogs)
    .groupBy(downloadLogs.browser);
}

export async function getPopularTemplates(limitCount = 5) {
  return await db
    .select({
      id: templates.id,
      courseNumber: templates.courseNumber,
      courseTitle: templates.courseTitle,
      downloads: count(downloadLogs.id),
    })
    .from(templates)
    .leftJoin(downloadLogs, eq(templates.id, downloadLogs.templateId))
    .groupBy(templates.id)
    .orderBy(desc(count(downloadLogs.id)))
    .limit(limitCount);
}

export async function getRecentDownloads(limitCount = 5) {
  return await db
    .select({
      id: downloadLogs.id,
      templateName: templates.courseNumber,
      userName: user.name,
      downloadedAt: downloadLogs.downloadedAt,
    })
    .from(downloadLogs)
    .leftJoin(templates, eq(downloadLogs.templateId, templates.id))
    .leftJoin(user, eq(downloadLogs.userId, user.id))
    .orderBy(desc(downloadLogs.downloadedAt))
    .limit(limitCount);
}

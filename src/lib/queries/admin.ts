import {db} from "@/db";
import {user, templates} from "@/db/schema";
import {ilike, or, count, desc, eq} from "drizzle-orm";

export async function getPaginatedUsers(
  page: number,
  pageSize: number,
  search: string,
) {
  const offset = (page - 1) * pageSize;

  const searchCondition = search
    ? or(
        ilike(user.name, `%${search}%`),
        ilike(user.email, `%${search}%`),
      )
    : undefined;

  const users = await db
    .select()
    .from(user)
    .where(searchCondition)
    .orderBy(desc(user.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalCountResult = await db
    .select({count: count()})
    .from(user)
    .where(searchCondition);

  return {
    users,
    totalCount: totalCountResult[0].count,
  };
}

export async function getPaginatedAdminTemplates(
  page: number,
  pageSize: number,
) {
  const offset = (page - 1) * pageSize;

  const adminTemplates = await db
    .select({
      template: templates,
      creator: user,
    })
    .from(templates)
    .leftJoin(user, eq(templates.createdBy, user.id))
    .orderBy(desc(templates.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalCountResult = await db
    .select({count: count()})
    .from(templates);

  return {
    templates: adminTemplates,
    totalCount: totalCountResult[0].count,
  };
}


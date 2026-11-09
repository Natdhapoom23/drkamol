import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { seedContent } from '../seed'

/** One-time starting content (from kamolhospital.com). Runs only on an empty database. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const { totalDocs } = await payload.count({ collection: 'publications', req, overrideAccess: true })
  if (totalDocs > 0) return
  await seedContent(payload, req)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content is left in place; delete it from the CMS if needed.
}

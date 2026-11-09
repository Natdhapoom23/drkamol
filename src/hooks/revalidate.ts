import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pages are statically generated (ISR). Whenever editors change content in the CMS,
 * purge every cached page so the public site shows the change on the next visit.
 */
const purge = async () => {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next.js (e.g. migrations or CLI scripts): nothing to purge.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (!req.context?.skipRevalidate) await purge()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (!req.context?.skipRevalidate) await purge()
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (!req.context?.skipRevalidate) await purge()
  return doc
}

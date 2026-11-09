import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Awards } from './collections/Awards'
import { Lectures } from './collections/Lectures'
import { Media } from './collections/Media'
import { Publications } from './collections/Publications'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { Works } from './collections/Works'
import { Profile } from './globals/Profile'
import { Settings } from './globals/Settings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl =
  process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL || ''

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · drkamol.com',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Works, Videos, Publications, Lectures, Awards, Media, Users],
  globals: [Profile, Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl },
    // Schema changes always go through migrations (src/migrations), locally and on Vercel.
    push: false,
    prodMigrations: migrations,
  }),
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'th', label: 'ภาษาไทย' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  i18n: {
    fallbackLanguage: 'en',
  },
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})

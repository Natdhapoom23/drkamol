import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { isLoggedIn, publishedOrLoggedIn } from './access'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)

export const Works: CollectionConfig = {
  slug: 'works',
  labels: { singular: 'Portfolio item', plural: 'Portfolio' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', '_status'],
    group: 'Content',
    description:
      'Photo stories for the archive: patient journeys, conferences, press and behind-the-scenes. Patient items cannot be published without recorded consent.',
    preview: (doc, { locale }) => `/${locale === 'th' ? 'th/' : ''}work/${doc.slug}`,
  },
  defaultSort: '-year',
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.title === 'string') data.slug = slugify(data.title)
        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        const publishing = data?._status === 'published'
        if (publishing && data?.category === 'patient' && !data?.consent?.confirmed) {
          throw new APIError(
            'Patient items can only be published after "Signed consent for web publication is on file" is ticked.',
            400,
            undefined,
            true,
          )
        }
        return data
      },
    ],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'category',
              type: 'select',
              required: true,
              defaultValue: 'patient',
              options: [
                { label: 'Patient journey', value: 'patient' },
                { label: 'Conference & teaching', value: 'conference' },
                { label: 'Press & media', value: 'press' },
                { label: 'Behind the scenes', value: 'hospital' },
              ],
            },
            { name: 'subtitle', type: 'text', localized: true, admin: { description: 'Short line under the title, e.g. "Israel · 2024"' } },
            { name: 'cover', type: 'upload', relationTo: 'media', required: true },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Images' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', localized: true },
              ],
            },
            { name: 'video', label: 'Video (optional)', type: 'relationship', relationTo: 'videos' },
            { name: 'story', type: 'richText', localized: true },
          ],
        },
        {
          label: 'Consent',
          description: 'Required for patient journeys (PDPA). The consent document itself stays in the hospital records system, not here.',
          fields: [
            {
              name: 'consent',
              type: 'group',
              fields: [
                { name: 'confirmed', label: 'Signed consent for web publication is on file', type: 'checkbox' },
                { name: 'reference', label: 'Consent reference no. (from hospital records)', type: 'text' },
                { name: 'expires', label: 'Unpublish after (optional)', type: 'date' },
                { name: 'initialsOnly', label: 'Show initials and country only', type: 'checkbox', defaultValue: true },
              ],
            },
          ],
        },
      ],
    },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { position: 'sidebar', description: 'Created from the English title.' } },
    { name: 'year', type: 'number', admin: { position: 'sidebar' } },
    { name: 'featured', label: 'Feature on home page', type: 'checkbox', admin: { position: 'sidebar' } },
  ],
}

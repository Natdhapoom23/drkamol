import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { extractYouTubeId } from '../lib/youtube'
import { isLoggedIn } from './access'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: { singular: 'Video', plural: 'Videos' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured'],
    group: 'Content',
    description: 'Paste a YouTube link. The thumbnail and player are loaded automatically.',
  },
  defaultSort: 'order',
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.youtube) data.youtube = extractYouTubeId(data.youtube) ?? data.youtube
        return data
      },
    ],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'youtube',
      label: 'YouTube link or video ID',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) =>
        (value && extractYouTubeId(value)) ? true : 'Paste a YouTube link (youtube.com/watch?v=…) or an 11-character ID',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'gender',
      options: [
        { label: 'Gender-affirming surgery', value: 'gender' },
        { label: 'Facial surgery (FFS)', value: 'facial' },
        { label: 'Body & breast', value: 'body' },
        { label: 'Academic / lecture', value: 'academic' },
        { label: 'Hospital & media', value: 'media' },
      ],
    },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'year', type: 'number' },
    { name: 'featured', label: 'Show as the film on the home page', type: 'checkbox', admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar', description: 'Lower numbers appear first.' } },
  ],
}

import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { isLoggedIn } from './access'

export const Lectures: CollectionConfig = {
  slug: 'lectures',
  labels: { singular: 'Lecture', plural: 'Lectures & conferences' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'event', 'city', 'year'],
    group: 'Academic',
  },
  defaultSort: '-year',
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', label: 'Talk title', type: 'text', required: true },
    { name: 'event', label: 'Congress / event', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text', admin: { width: '35%' } },
        { name: 'country', type: 'text', admin: { width: '35%' } },
        { name: 'year', type: 'number', admin: { width: '30%' } },
      ],
    },
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'lecture',
      options: [
        { label: 'Lecture', value: 'lecture' },
        { label: 'Keynote / invited speaker', value: 'keynote' },
        { label: 'Poster', value: 'poster' },
        { label: 'Live surgery / workshop', value: 'workshop' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'video', label: 'Recording (YouTube link or ID)', type: 'text' },
    { name: 'featured', type: 'checkbox', admin: { position: 'sidebar' } },
  ],
}

import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { isLoggedIn } from './access'

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Publications' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'journal', 'year', 'featured'],
    group: 'Academic',
    description: 'Peer-reviewed papers, case reports and book chapters. Titles stay in English.',
  },
  defaultSort: '-year',
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'journal', type: 'text', required: true, admin: { width: '60%' } },
        { name: 'year', type: 'number', admin: { width: '20%' } },
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'article',
          admin: { width: '20%' },
          options: [
            { label: 'Article', value: 'article' },
            { label: 'Case report', value: 'case-report' },
            { label: 'Review', value: 'review' },
            { label: 'Book chapter', value: 'chapter' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'doi', label: 'DOI', type: 'text', admin: { width: '50%', placeholder: '10.1097/…' } },
        { name: 'url', label: 'Link (PubMed or journal)', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'authors', type: 'text', admin: { placeholder: 'Pansritum K, et al.' } },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional one-paragraph plain-language summary.' },
    },
    { name: 'featured', type: 'checkbox', admin: { position: 'sidebar' } },
  ],
}

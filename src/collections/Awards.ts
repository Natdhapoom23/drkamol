import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { isLoggedIn } from './access'

export const Awards: CollectionConfig = {
  slug: 'awards',
  labels: { singular: 'Award or honour', plural: 'Awards & honours' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'year'], group: 'Academic' },
  defaultSort: '-year',
  access: { read: () => true, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'detail', type: 'text', localized: true, admin: { description: 'e.g. the paper or talk it was awarded for' } },
    { type: 'row', fields: [{ name: 'organization', type: 'text', admin: { width: '70%' } }, { name: 'year', type: 'number', admin: { width: '30%' } }] },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

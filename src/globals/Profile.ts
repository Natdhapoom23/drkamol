import type { GlobalConfig } from 'payload'

import { isLoggedIn } from '../collections/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Dr. Kamol profile',
  admin: { group: 'Content' },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true },
            { name: 'role', label: 'Title line', type: 'text', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'headlineA', label: 'Headline, line 1', type: 'text', localized: true, admin: { width: '50%' } },
                { name: 'headlineB', label: 'Headline, line 2', type: 'text', localized: true, admin: { width: '50%' } },
              ],
            },
            { name: 'intro', type: 'textarea', localized: true },
            { name: 'portrait', type: 'upload', relationTo: 'media', admin: { description: 'Tall portrait. At least 1600 px wide.' } },
            { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Optional full-width background, at least 2400 px wide.' } },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'wordA', label: 'Statement word 1', type: 'text', localized: true },
                { name: 'wordB', label: 'Statement word 2', type: 'text', localized: true },
                { name: 'wordC', label: 'Statement word 3', type: 'text', localized: true },
              ],
            },
            { name: 'statement', type: 'textarea', localized: true },
            { name: 'bio', label: 'Biography', type: 'textarea', localized: true },
            { name: 'philosophy', label: 'In his words (founder message)', type: 'textarea', localized: true },
            { name: 'quote', label: 'Pull quote', type: 'textarea', localized: true },
            { name: 'bandImage', label: 'Parallax band image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Figures',
          description: 'Only figures with "Confirmed" ticked are shown on the website. Publication and lecture counts are calculated automatically.',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true, admin: { placeholder: '5,000+' } },
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'confirmed', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        {
          label: 'Credentials',
          fields: [
            {
              name: 'education',
              type: 'array',
              fields: [
                { name: 'year', type: 'text' },
                { name: 'degree', type: 'text', required: true, localized: true },
                { name: 'institution', type: 'text', localized: true },
              ],
            },
            {
              name: 'career',
              type: 'array',
              fields: [
                { name: 'period', type: 'text' },
                { name: 'role', type: 'text', required: true, localized: true },
                { name: 'place', type: 'text', localized: true },
              ],
            },
            {
              name: 'memberships',
              type: 'array',
              fields: [{ name: 'name', type: 'text', required: true, localized: true }],
            },
            { name: 'license', label: 'Medical licence line', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
}

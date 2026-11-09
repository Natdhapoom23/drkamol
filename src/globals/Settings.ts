import type { GlobalConfig } from 'payload'

import { isLoggedIn } from '../collections/access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: { read: () => true, update: isLoggedIn },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text' },
            { name: 'hospitalName', type: 'text', localized: true },
            { name: 'address', type: 'textarea', localized: true },
            { name: 'appointmentUrl', label: 'Consultation / booking link', type: 'text' },
            { name: 'hospitalUrl', label: 'Hospital website', type: 'text' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'youtube', type: 'text' },
            { name: 'facebook', type: 'text' },
            { name: 'instagram', type: 'text' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'siteTitle', type: 'text', localized: true },
            { name: 'siteDescription', type: 'textarea', localized: true, admin: { description: 'About 150 characters, shown in Google results.' } },
            { name: 'ogImage', label: 'Sharing image (1200 × 630)', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {colorInput} from '@sanity/color-input'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'
import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Website',

  projectId: '39ozs2jh',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem().title('Global').id('322b9c63-9ea5-4deb-8ddf-f8d1e476da33').child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType('global')
                .documentId('322b9c63-9ea5-4deb-8ddf-f8d1e476da33')
                .title('Configuration globale du site'),
            ),

            // Regular document types
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('categories').title('Catégorie de produits'),
            S.documentTypeListItem('products').title('Produits'),
            S.documentTypeListItem('post').title('Articles de blog'),
            S.documentTypeListItem('membres').title('Staff'),
          ]),
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Netlify',
          sites: [
            {
              title: 'Website - Velletaz',
              apiId: 'e2f8ef00-3797-4505-aff1-9daa39618835',
              buildHookId: '668cf9f990e0611b46590c3d',
              name: 'Website - Velletaz',
            },
          ],
        }),
      ],
    }),
    inlineSvgInput(),
    colorInput(),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

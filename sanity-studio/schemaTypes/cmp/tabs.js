import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'tabs',
  type: 'document',
  title: 'Liste à Onglets',
  fields: [
    copyPaste,
    {
      name: 'id',
      title: 'Ancre du composant',
      description:
        'Un lien vers /slug/#ancre peut être utilisé pour naviguer directement à cet endroit.',
      type: 'string',
    },
    {
      name: 'onglets',
      title: 'Onglets',
      type: 'array',
      of: [
        {
          name: 'ongletobj',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Titre',
            },
            {
              name: 'content',
              type: 'array',
              title: 'Texte',
              of: [{type: 'block'}, {type: 'button'}],
            },
          ],
        },
      ],
    },
  ],
}

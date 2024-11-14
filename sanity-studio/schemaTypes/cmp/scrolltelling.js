import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'scrolltelling',
  type: 'document',
  title: 'Défilement horizontal',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      let {title} = selection
      return {
        title: `Défilement horizontal`,
      }
    },
  },
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
      name: 'slides',
      title: 'Panneaux',
      type: 'array',
      of: [
        {
          name: 'slideobj',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image de fond',
              type: 'image',
              fields: [
                {name: 'alt', type: 'string'},
                {
                  name: 'duotone',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Accent1', value: 'duoAccent1'},
                      {title: 'Accent2', value: 'duoAccent2'},
                    ],
                  },
                },
              ],
            },
            {
              name: 'text',
              title: 'Texte',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
        },
      ],
    },
  ],
}

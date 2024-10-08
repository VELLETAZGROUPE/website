import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'section',
  type: 'document',
  title: 'Section',
  preview: {
    select: {
      title: 'text',
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
      name: 'text',
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
      title: 'Texte',
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      initialValue: {
        duotone: false,
      },
      fields: [
        {name: 'alt', type: 'string'},
        {name: 'duotone', type: 'boolean'},
      ],
    },
    {
      name: 'bg',
      type: 'string',
      title: 'Couleur du fond',
      options: {
        list: [
          {title: 'Blanc', value: 'white'},
          {title: 'Vert', value: 'green'},
          {title: 'Bordeau', value: 'red'},
        ],
      },
    },
  ],
}

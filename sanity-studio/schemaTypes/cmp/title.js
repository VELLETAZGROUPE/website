import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'title',
  type: 'document',
  title: 'Bloc Titre',
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
      name: 'content',
      type: 'array',
      title: 'Texte',
      of: [{type: 'block'}, {type: 'button'}],
    },
    {
      name: 'img',
      title: 'Image',
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
  ],
}

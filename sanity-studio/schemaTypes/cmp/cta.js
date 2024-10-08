import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'cta',
  type: 'document',
  title: 'CTA',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      let {title} = selection
      return {
        title: `CTA`,
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
      name: 'content',
      title: 'Texte',
      type: 'array',
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

import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'testimonials',
  type: 'document',
  title: "Liste d'avis",
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
      name: 'title',
      title: 'Titre',
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
    },
  ],
}

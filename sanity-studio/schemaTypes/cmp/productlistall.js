import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'productlistall',
  type: 'document',
  title: 'Liste de tous les produits',
  preview: {
    select: {
      title: 'name',
      subtitle: 'cat.name',
    },
    prepare(selection) {
      let {title, subtitle} = selection

      return {
        title: `Liste de tous les produits`,
        subtitle: `${subtitle}`,
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
  ],
}

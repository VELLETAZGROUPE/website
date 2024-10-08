import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'productlistcat',
  type: 'document',
  title: 'Liste de produits par catégories',
  preview: {
    select: {
      title: 'name',
      subtitle: 'cat.name',
    },
    prepare(selection) {
      let {title, subtitle} = selection

      return {
        title: `Liste de produits`,
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
    {
      name: 'title',
      title: 'Titre',
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
    },
    {
      name: 'hasfilter',
      type: 'boolean',
      title: 'Filtres ?',
    },
    {
      name: 'height',
      type: 'string',
      title: 'Hauteur des images',
      options: {
        list: [
          {title: 'Petite', value: 'small'},
          {title: 'Moyenne', value: 'medium'},
          {title: 'Grande', value: 'large'},
        ],
      },
    },
    {
      name: 'col',
      type: 'string',
      title: 'Nombre maximum de colonnes de la grille produits',
      options: {
        list: [
          {title: '2', value: '6'},
          {title: '3', value: '4'},
          {title: '4', value: '3'},
        ],
      },
    },
    {
      name: 'cat',
      type: 'reference',
      title: 'Catégorie',
      to: [{type: 'categories'}],
    },
  ],
}

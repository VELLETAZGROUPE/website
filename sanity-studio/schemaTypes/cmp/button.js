export default {
  name: 'button',
  type: 'document',
  title: 'Bouton',
  preview: {
    select: {
      title: 'content',
    },
  },
  fields: [
    {
      name: 'content',
      type: 'string',
      title: 'Texte du bouton',
    },
    {
      name: 'href',
      type: 'object',
      title: 'Lien',
      initialValue: {
        isExt: false,
      },
      fields: [
        {
          name: 'isExt',
          type: 'boolean',
          title: 'Lien externe ?',
        },
        {
          name: 'linkInt',
          type: 'reference',
          to: [{type: 'page'}, {type: 'categories'}, {type: 'post'}, {type: 'products'}],
          title: 'Lien interne',
          hidden: ({parent}) => {
            return parent?.isExt !== false
          },
        },
        {
          name: 'linkExt',
          type: 'string',
          title: 'Lien externe',
          description: 'https://www.exemple.com/url',
          hidden: ({parent}) => {
            return parent?.isExt !== true
          },
        },
      ],
    },
    {
      name: 'color',
      type: 'string',
      title: 'Couleur du bouton',
      options: {
        list: [
          {title: 'vert', value: 'vert'},
          {title: 'bordeau', value: 'bordeau'},
        ],
      },
    },
    {
      name: 'size',
      type: 'string',
      title: 'Taille du bouton',
      options: {
        list: [
          {title: 'Petit', value: 'small'},
          {title: 'Moyen', value: 'medium'},
          {title: 'Grand', value: 'large'},
        ],
      },
    },
  ],
}

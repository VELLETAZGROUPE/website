export default {
  name: 'biglist',
  type: 'document',
  title: 'Liste & images',
  fields: [
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
      name: 'size',
      title: 'Taille des images',
      type: 'string',
      options: {
        list: [
          {title: 'Grandes', value: 'large'},
          {title: 'Moyennes', value: 'medium'},
          {title: 'Petites', value: 'small'},
        ],
      },
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'itemobj',
          type: 'object',
          fields: [
            {
              name: 'itemtitle',
              type: 'string',
              title: 'Nom',
            },
            {
              name: 'img',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'itemtext',
              title: 'Texte',
              type: 'array',
              of: [{type: 'block'}, {type: 'button'}],
            },
          ],
        },
      ],
    },
  ],
}

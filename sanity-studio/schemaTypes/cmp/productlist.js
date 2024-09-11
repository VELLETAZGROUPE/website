import {useFormValue} from 'sanity'

export default {
  name: 'productlist',
  type: 'document',
  title: 'Liste de produits',
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
      name: 'products',
      title: 'Produits',
      type: 'array',
      of: [
        {
          name: 'productobj',
          type: 'object',
          fields: [
            {
              name: 'producttitle',
              type: 'string',
              title: 'Nom',
            },
            {
              name: 'level',
              title: 'Niveau hierarchique',
              type: 'string',
              options: {
                list: [
                  {title: 'H1', value: 'h1'},
                  {title: 'H2', value: 'h2'},
                  {title: 'H3', value: 'h3'},
                  {title: 'H4', value: 'h4'},
                  {title: 'H5', value: 'h5'},
                  {title: 'H6', value: 'h6'},
                  {title: 'p', value: 'p'},
                ],
              },
            },
            {
              name: 'link',
              type: 'reference',
              to: [{type: 'page'}],
              title: 'Lien',
            },
            {
              name: 'filters',
              title: 'Filtres',
              type: 'array',
              of: [{type: 'string'}],
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

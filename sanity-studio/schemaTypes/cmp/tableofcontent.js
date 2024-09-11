export default {
  name: 'tableofcontent',
  type: 'document',
  title: 'Liste avec table des matières',
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'itemobj',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image',
              type: 'image',
              initialValue: {
                duotone: true,
              },
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
              name: 'toctitle',
              title: "Titre de l'item",
              type: 'string',
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
              name: 'toctext',
              title: 'Texte',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default {
  name: 'map',
  type: 'document',
  title: 'Carte interactive',
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
      name: 'poi',
      title: "Point d'intérêt",
      type: 'array',
      of: [
        {
          name: 'poiobj',
          type: 'object',
          fields: [
            {
              name: 'coord',
              type: 'object',
              title: 'Coordonnées',
              fields: [
                {
                  name: 'top',
                  type: 'string',
                  title: 'En partant du haut',
                  description: 'en %',
                },
                {
                  name: 'left',
                  type: 'string',
                  title: 'En partant du bas',
                  description: 'en %',
                },
              ],
            },
            {
              name: 'name',
              title: 'Nom du point',
              description: 'non utilisé',
              type: 'string',
            },
            {
              name: 'content',
              title: "Texte de la fenêtre d'information",
              type: 'array',
              of: [{type: 'block'}, {type: 'button'}],
            },
            {
              name: 'poiimg',
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
        },
      ],
    },
  ],
}

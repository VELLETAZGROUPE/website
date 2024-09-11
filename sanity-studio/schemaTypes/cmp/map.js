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
  ],
}

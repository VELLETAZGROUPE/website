export default {
  name: 'section',
  type: 'document',
  title: 'Section',
  initialValue: {
    useCol: true,
  },
  preview: {
    select: {
      title: 'text',
    },
  },
  fields: [
    {
      name: 'id',
      title: 'Ancre du composant',
      description:
        'Un lien vers /slug/#ancre peut être utilisé pour naviguer directement à cet endroit.',
      type: 'string',
    },
    {
      name: 'text',
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
      title: 'Texte',
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      initialValue: {
        duotone: false,
      },
      fields: [
        {name: 'alt', type: 'string'},
        {name: 'duotone', type: 'boolean'},
      ],
    },
    {
      name: 'useCol',
      type: 'boolean',
      title: 'Double colonne ?',
    },
    {
      name: 'bg',
      type: 'string',
      title: 'Couleur du fond',
      options: {
        list: [
          {title: 'Blanc', value: 'white'},
          {title: 'Vert', value: 'green'},
          {title: 'Bordeau', value: 'red'},
        ],
      },
    },
  ],
}

export default {
  name: 'logogallery',
  type: 'document',
  title: 'Galerie de logos',
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
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          name: 'logo',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image',
              type: 'image',
              fields: [{name: 'alt', type: 'string'}],
            },
            {
              name: 'link',
              type: 'string',
              title: 'Lien externe',
            },
          ],
        },
      ],
    },
  ],
}

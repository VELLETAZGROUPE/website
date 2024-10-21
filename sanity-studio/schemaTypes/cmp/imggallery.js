export default {
  name: 'imggallery',
  type: 'document',
  title: "Gallerie d'images",
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      let {title} = selection
      return {
        title: `Galerie d'images`,
      }
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
      name: 'gallery',
      title: 'Gallerie',
      type: 'array',
      of: [
        {
          name: 'img',
          type: 'image',
          fields: [{name: 'alt', type: 'string'}],
        },
      ],
    },
  ],
}

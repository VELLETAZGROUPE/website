export default {
  name: 'videobg',
  type: 'document',
  title: 'Vidéo Background',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      let {title} = selection
      return {
        title: `Vidéo en Background`,
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
  ],
}

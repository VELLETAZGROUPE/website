export default {
  name: 'motiondesign',
  type: 'document',
  title: 'Animation Logo',
  preview: {
    select: {
      title: 'name',
    },
    prepare(selection) {
      let {title} = selection
      return {
        title: `Animation Logo`,
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

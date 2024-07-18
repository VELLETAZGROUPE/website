export default {
  name: 'hero',
  type: 'document',
  title: 'Hero',
  preview: {
    select: {
      title: 'cmp',
      subtitle: 'heading.content',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Composant Hero`,
        subtitle: `${subtitle ? subtitle : ''}`,
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

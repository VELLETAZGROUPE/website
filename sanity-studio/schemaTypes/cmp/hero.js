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
    {
      name: 'heading',
      title: 'Titre',
      type: 'object',
      fields: [
        {
          name: 'content',
          title: 'Texte',
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
      ],
    },
    {
      name: 'subheading',
      title: 'Sous-titre',
      description:
        "Vous pouvez utiliser %year% pour afficher le nombre d'année écoulée depuis la création de l'entreprise (1987)",
      type: 'array',
      of: [{type: 'block'}],
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
        {name: 'duotone', type: 'boolean'},
      ],
    },
  ],
}

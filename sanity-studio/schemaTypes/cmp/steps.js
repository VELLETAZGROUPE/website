export default {
  name: 'steps',
  type: 'document',
  title: 'Étapes',
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
      name: 'steps',
      title: 'Étapes',
      type: 'array',
      of: [
        {
          name: 'stepobj',
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: "Nom de l'étape",
            },
            {
              name: 'description',
              type: 'text',
              title: "Description de l'étape",
            },
          ],
        },
      ],
    },
  ],
}

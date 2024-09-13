export default {
  name: 'timeline',
  type: 'document',
  title: 'Timeline verticale',
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
      name: 'events',
      title: 'Liste des évènements de la chronologie',
      type: 'array',
      of: [
        {
          name: 'eventobj',
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Année',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
            },
          ],
        },
      ],
    },
  ],
}

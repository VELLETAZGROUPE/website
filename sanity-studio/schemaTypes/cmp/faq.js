export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
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
      name: 'faq',
      title: 'Foire aux questions',
      type: 'array',
      of: [
        {
          name: 'qa',
          type: 'object',
          fields: [
            {type: 'string', name: 'question', title: 'Question'},
            {type: 'text', name: 'answer', title: 'Réponse'},
          ],
        },
      ],
    },
  ],
}

export default {
  name: 'actupreview',
  type: 'document',
  title: 'Dernières actus',
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
      name: 'actus',
      title: 'Actualités mises en avant',
      type: 'array',
      of: [
        {
          name: 'post',
          title: 'Choix du post à afficher',
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
    },
  ],
}

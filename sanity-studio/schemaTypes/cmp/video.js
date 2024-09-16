export default {
  name: 'video',
  type: 'document',
  title: 'Vidéo',
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
      name: 'ytID',
      title: 'ID de la vidéo YouTube',
      description: "https://www.youtube.com/watch?v=fFGtxqrfHwk. Dans ce cas l'ID est fFGtxqrfHwk.",
      type: 'string',
    },
    {
      name: 'img',
      title: 'Image à afficher avant le lancement de la vidéo',
      type: 'image',
      fields: [
        {name: 'alt', type: 'string'},
        {
          name: 'duotone',
          type: 'string',
          options: {
            list: [
              {title: 'Accent1', value: 'duoAccent1'},
              {title: 'Accent2', value: 'duoAccent2'},
            ],
          },
        },
      ],
    },
  ],
}

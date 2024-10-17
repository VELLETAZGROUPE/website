const LinkInternal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M11.099 3c-3.65.007-5.56.096-6.781 1.318C3 5.636 3 7.757 3 12c0 4.242 0 6.364 1.318 7.682S7.757 21 11.998 21c4.243 0 6.364 0 7.682-1.318c1.22-1.221 1.31-3.133 1.317-6.782m-.441-9.404L11.05 13.06m9.507-9.563c-.494-.494-3.822-.448-4.525-.438m4.525.438c.494.495.448 3.827.438 4.531"
      color="currentColor"
    />
  </svg>
)

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
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien externe',
                initialValue: {
                  blank: true,
                },
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                      }),
                  },
                  {
                    title: 'Ouvrir dans un nouvel onglet ?',
                    name: 'blank',
                    description: 'Voir https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Lien interne',
                icon: LinkInternal,
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      {type: 'page'},
                      {type: 'categories'},
                      {type: 'products'},
                      {type: 'post'},
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
        },
        {type: 'button'},
      ],
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

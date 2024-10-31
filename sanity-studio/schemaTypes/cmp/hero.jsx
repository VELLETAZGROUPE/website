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
  name: 'hero',
  type: 'document',
  title: 'Hero',
  preview: {
    select: {
      title: 'cmp',
      subtitle: 'layout',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Hero`,
        subtitle: `${subtitle ? subtitle : ''}`,
      }
    },
  },
  initialValue: {
    fullscreen: false,
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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {value: 'HeroSplit', title: 'Split'},
          {value: 'HeroFull', title: 'Full'},
          {value: 'HeroClip', title: 'Clip'},
          {value: 'HeroDuo', title: 'Duotone'},
        ],
      },
    },
    {
      name: 'blur',
      type: 'string',
      title: 'Intensité du flou derrière le texte',
      options: {
        list: [
          {value: 'hi', title: 'Fort'},
          {value: 'mid', title: 'Moyen'},
          {value: 'lo', title: 'Faible'},
        ],
      },
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroFull') {
          return false
        }
        return true
      },
    },
    {
      name: 'fullscreen',
      type: 'boolean',
      title: 'Plein écran ?',
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroSplit') {
          return false
        } else if (parent?.layout == 'HeroFull') {
          return false
        }
        return true
      },
    },
    {
      name: 'duotone',
      type: 'string',
      title: 'Duotone FX',
      options: {
        list: [
          {value: 'duoAccent1', title: 'Vert'},
          {value: 'duoAccent2', title: 'Bordeaux'},
        ],
      },
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroDuo') {
          return false
        }
        return true
      },
    },
    {
      name: 'imgsize',
      type: 'string',
      title: "Taille de l'image",
      options: {
        list: [
          {value: 'spanthird', title: '1/3'},
          {value: 'spanhalf', title: '50%'},
        ],
      },
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroSplit') {
          return false
        }
        return true
      },
    },
    {
      name: 'opacity',
      type: 'number',
      title: "Éclaircissement/Assombrissement de l'image de fond",
      description: "Peut servir à faire ressortir le texte de l'image",
      options: {
        list: [-90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      },
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroFull') {
          return false
        }
        return true
      },
    },
    {
      name: 'textcolor',
      type: 'string',
      title: 'Couleur du texte',
      options: {
        list: [
          {value: 'bg', title: 'Clair'},
          {value: 'body', title: 'Foncé'},
        ],
      },
      hidden: ({parent}) => {
        if (parent?.layout == 'HeroFull') {
          return false
        }
        return true
      },
    },
    {
      name: 'texte',
      title: 'Texte',
      description: 'Pour la bannière logo, utiliser %velletaz%',
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
        {type: 'img'},
      ],
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      fields: [{name: 'alt', type: 'string'}],
    },
  ],
}

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
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
    },
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      fields: [{name: 'alt', type: 'string'}],
    },
  ],
}

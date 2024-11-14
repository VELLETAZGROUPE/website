import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'team',
  type: 'document',
  title: 'Présentation équipe',
  initialValue: {
    contact: false,
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
      name: 'title',
      title: 'Titre',
      type: 'array',
      of: [{type: 'block'}, {type: 'button'}],
    },
    {
      name: 'contact',
      title: 'Contact ?',
      description:
        'Cocher la case si vous souhaitez que seuls les informations de contact soient affichées.',
      type: 'boolean',
    },
    {
      name: 'members',
      title: "Membres de l'équipe",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'membres'}],
        },
      ],
    },
  ],
}

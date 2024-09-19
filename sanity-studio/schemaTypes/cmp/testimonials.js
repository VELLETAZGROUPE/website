import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'testimonials',
  type: 'document',
  title: "Liste d'avis",
  fields: [
    copyPaste,
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
      name: 'testimonials',
      title: 'Avis',
      type: 'array',
      of: [
        {
          name: 'testimonialobj',
          type: 'object',
          fields: [
            {
              name: 'content',
              type: 'text',
              title: 'Avis',
              description: 'Des guillemets seront ajoutés automatiquement au début et à la fin.',
            },
            {
              name: 'name',
              type: 'string',
              title: "Nom de la personne ayant laissé l'avis",
            },
            {
              name: 'function',
              type: 'string',
              title: 'Entreprise ou fonction occupée',
            },
          ],
        },
      ],
    },
  ],
}

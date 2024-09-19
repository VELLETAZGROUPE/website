import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'team',
  type: 'document',
  title: 'Présentation équipe',
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
      name: 'members',
      title: "Membres de l'équipe",
      type: 'array',
      of: [
        {
          name: 'member',
          type: 'object',
          fields: [
            copyPaste,
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
            },
            {
              name: 'img',
              title: 'Image',
              description: 'doit gérer la transparence (png par exemple) et être détourée',
              type: 'image',
            },
            {
              name: 'poste',
              title: 'Poste',
              type: 'string',
            },
            {name: 'millesime', title: 'Millésime', type: 'string'},
            {name: 'devise', title: 'Devise', type: 'string'},
            {name: 'parcours', title: 'Parcours', type: 'text'},
            {name: 'aime', title: "Ce qu'il aime", type: 'string'},
            {name: 'aimepas', title: "Ce qu'il n'aime pas", type: 'string'},
            {name: 'cepage', title: 'Cépage préféré', type: 'string'},
            {name: 'qualite', title: 'Une de ses (nombreuses) qualités', type: 'string'},
            {name: 'defaut', title: 'Un de ses défauts', type: 'string'},
            {name: 'anecdote', title: 'Une anecdote', type: 'string'},
          ],
        },
      ],
    },
  ],
}

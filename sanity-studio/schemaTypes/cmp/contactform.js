import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'contactform',
  type: 'document',
  title: 'Formulaire de contact',
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
      name: 'formName',
      title: 'Nom du formulaire',
      type: 'string',
    },
    {
      name: 'form',
      title: 'Formulaire de contact',
      type: 'object',
      fields: [
        {
          name: 'prenom',
          type: 'object',
          title: 'Champ Prénom',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'nom',
          type: 'object',
          title: 'Champ Nom',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'mail',
          type: 'object',
          title: 'Champ Email',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'tel',
          type: 'object',
          title: 'Champ Téléphone',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'societe',
          type: 'object',
          title: 'Champ Société',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'postcode',
          type: 'object',
          title: 'Champ Code Postal',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'ville',
          type: 'object',
          title: 'Champ Ville',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'message',
          type: 'object',
          title: 'Champ Message',
          fields: [
            {name: 'title', type: 'string', title: 'Titre du champ'},
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder (exemple de valeur acceptée)',
            },
          ],
        },
        {
          name: 'btntext',
          type: 'string',
          title: 'Texte du bouton pour envoyer le formulaire',
        },
        {
          name: 'rgpd',
          type: 'text',
          title: "Texte légal d'information sur l'utilisation des données transmises par mail",
        },
        {
          name: 'success',
          type: 'string',
          title: "Texte à afficher sur le site en cas de réussite de l'envoi du message",
        },
      ],
    },
  ],
}

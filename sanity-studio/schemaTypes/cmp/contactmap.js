import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'contactmap',
  type: 'document',
  title: 'Contact et Google maps',
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
      name: 'address',
      type: 'array',
      title: 'Adresse',
      of: [{type: 'block'}],
    },
    {
      name: 'mail',
      type: 'string',
      title: 'Email',
      validation: (Rule) => Rule.email().warning('Un email valide est préférable'),
    },
    {
      name: 'tel',
      type: 'string',
      title: 'Téléphone',
    },
    {
      name: 'horaires',
      type: 'text',
      title: "Horaires d'ouverture",
    },
    {
      name: 'mapImg',
      title: 'Image facade Google Maps',
      type: 'image',
    },
    {
      name: 'iframesrc',
      title: 'iframe src',
      type: 'string',
      description:
        'Disponible sur Google Maps en cliquant sur "Partager" puis sur "Intégrer une carte". Dans le contenu HTML, ne garder que la valeur après src. Par exemple https://google.com/maps/embed?pb=... ',
    },
  ],
}

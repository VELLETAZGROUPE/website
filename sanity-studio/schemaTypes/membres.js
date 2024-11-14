export default {
  name: 'membres',
  type: 'document',
  title: 'Équipe',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom complet',
    },
    {
      name: 'img',
      type: 'image',
      title: "Image utilisée pour l'affichage des produits",
    },
    {
      name: 'poste',
      title: 'Poste',
      type: 'string',
    },
    {
      name: 'tel',
      title: 'Téléphone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'secteurs',
      title: 'En charge des secteurs :',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Millésime',
      type: 'string',
    },
    {
      name: 'devise',
      title: 'Sa Devise',
      type: 'string',
    },
    {
      name: 'parcours',
      title: 'Son parcours',
      type: 'text',
    },
    {
      name: 'like',
      title: "Ce qu'il aime",
      type: 'string',
    },
    {
      name: 'hate',
      title: "Ce qu'il n'aime pas",
      type: 'string',
    },
    {
      name: 'cepage',
      title: 'Son cépage préféré',
      type: 'string',
    },
    {
      name: 'qualite',
      title: 'Qualité',
      type: 'string',
    },
    {
      name: 'defaut',
      title: 'Défaut',
      type: 'string',
    },
    {
      name: 'anecdote',
      title: 'Anecdote',
      type: 'text',
    },
  ],
}

import {copyPaste} from '@superside-oss/sanity-plugin-copy-paste'

export default {
  name: 'calculette',
  type: 'document',
  title: 'Calculateur',
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
      name: 'heading',
      title: 'Titre',
      type: 'object',
      fields: [
        {
          name: 'content',
          title: 'Texte',
          type: 'string',
        },
        {
          name: 'level',
          title: 'Niveau hierarchique',
          type: 'string',
          options: {
            list: [
              {title: 'H1', value: 'h1'},
              {title: 'H2', value: 'h2'},
              {title: 'H3', value: 'h3'},
              {title: 'H4', value: 'h4'},
              {title: 'H5', value: 'h5'},
              {title: 'H6', value: 'h6'},
              {title: 'p', value: 'p'},
            ],
          },
        },
      ],
    },
    {
      name: 'subheading',
      title: 'Sous-titre',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'labelSurface',
      title: 'Titre Surface en hectares',
      type: 'string',
    },
    {
      name: 'placeholderSurface',
      title: 'Placeholder Surface en hectares',
      type: 'string',
    },
    {
      name: 'labelGapRangs',
      title: 'Titre écartement entre les rangs en mètres',
      type: 'string',
    },
    {
      name: 'placeholderGapRangs',
      title: 'Placeholder écartement entre les rangs en mètres',
      type: 'string',
    },
    {
      name: 'labelGapCeps',
      title: 'Titre écartement entre les ceps en mètres',
      type: 'string',
    },
    {
      name: 'placeholderGapCeps',
      title: 'Placeholder écartement entre les ceps en mètres',
      type: 'string',
    },
    {
      name: 'labelTournieres',
      title: 'Titre Pourcentage de tournières',
      type: 'string',
    },
    {
      name: 'placeholderTournieres',
      title: 'Placeholder Pourcentage de tournières',
      type: 'string',
    },
    {
      name: 'resultTitle',
      title: 'Phrase résultat',
      type: 'string',
    },
    {
      name: 'btnContent',
      title: 'Texte du bouton contact',
      type: 'string',
    },
    {
      name: 'btnHref',
      title: 'Lien du bouton contact',
      type: 'object',
      initialValue: {
        isExt: false,
      },
      fields: [
        {
          name: 'isExt',
          type: 'boolean',
          title: 'Lien externe ?',
        },
        {
          name: 'linkInt',
          type: 'reference',
          to: [{type: 'page'}, {type: 'categories'}, {type: 'post'}, {type: 'products'}],
          title: 'Lien interne',
          hidden: ({parent}) => {
            return parent?.isExt !== false
          },
        },
        {
          name: 'linkExt',
          type: 'object',
          title: 'Lien externe',
          description: 'https://www.exemple.com/url',
          hidden: ({parent}) => {
            return parent?.isExt !== true
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
          ],
        },
      ],
    },
  ],
}

const query = encodeURIComponent('*[_type == "global"]{cat}')
const url = `https://39ozs2jh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
// fetch the content

const data = await fetch(url)
  .then((res) => res.json())
  .then(({result}) => {
    return result[0]
  })

let cat

if (!data) {
  cat = ''
} else {
  cat = data.cat
}

export default {
  name: 'post',
  type: 'document',
  title: 'Articles de blog',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'networks',
      title: 'Réseaux Sociaux',
    },
  ],
  preview: {
    select: {
      title: 'h1',
      subtitle: 'slug',
    },
    prepare(selection) {
      let {title, subtitle} = selection
      if (subtitle == undefined) {
        subtitle = ''
      }
      return {
        title: `${title}`,
        subtitle: `slug: ${subtitle}`,
      }
    },
  },
  fields: [
    {
      name: 'h1',
      type: 'string',
      title: "H1 de l'article",
      description: "Sera affichée dans la carte de l'article sur la page blog",
      validation: (Rule) => Rule.required().warning('Le h1 de la page est obligatoire'),
    },
    {
      name: 'abstract',
      type: 'array',
      title: "Résumé de l'article",
      description: "Sera affiché dans la carte de l'article sur la page blog",
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().warning('Le résumé de la page est obligatoire'),
    },
    {
      name: 'img',
      title: "Image d'illustration de l'article",
      type: 'image',
      fields: [{name: 'alt', title: 'Texte alternatif', type: 'string'}],
      description: "Sera affiché dans la carte de l'article sur la page blog",
      validation: (Rule) => Rule.required().warning("L'image de la page est obligatoire"),
    },
    {
      name: 'cat',
      title: "Catégories de l'article",
      description: "Pensez à recharger la page si toutes les catégories n'apparaissent pas",
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: cat,
      },
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date du post',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    },
    {
      name: 'twitterText',
      title: 'Contenu du post sur X (Twitter)',
      description: '280 caractères max',
      group: 'networks',
      type: 'text',
      validation: (Rule) =>
        Rule.max(280).warning('Le contenu du post est trop long (max 280 caractères)'),
    },
    {
      name: 'twitterHashtags',
      title: 'Liste de #hashtags pour le post',
      description: 'Liste de #hashtags séparés par une virgule',
      type: 'string',
      group: 'networks',
      validation: (Rule) =>
        Rule.regex(/^[^\s,]+(?:,\s*[^\s,]+)*$/, {
          name: 'comma separated', // Error message is "Does not match email-pattern"
          invert: false, // Boolean to allow any value that does NOT match pattern
        }),
    },
    {
      name: 'pinterestDescription',
      title: "Description de l'épingle Pinterest",
      description: '500 caractères max',
      group: 'networks',
      type: 'text',
      validation: (Rule) =>
        Rule.max(500).warning('La description est trop longue (max 500 caractères)'),
    },
    {
      name: 'mailObject',
      title: "L'object de l'email",
      group: 'networks',
      type: 'string',
    },
    {
      name: 'mailBody',
      title: "Le corps de l'email",
      group: 'networks',
      type: 'text',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'seo',
      description:
        ' - MonSiteWeb sera ajouté à la fin du title si vous avez renseigné ce champ dans "Global"',
      validation: (Rule) => Rule.required().warning('Le title est obligatoire'),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Metadescription',
      group: 'seo',
      validation: (Rule) => Rule.required().warning('La metadescription est obligatoire'),
    },
    {
      name: 'slug',
      type: 'string',
      title: 'Slug de la page',
      description: "L'URL après https://www.monsiteweb.fr/. Ne pas commencer par /",
      group: 'seo',
      validation: (Rule) => Rule.regex(/^(?:(?!\/))[a-z0-9-\/]+$/, {name: 'slug', invert: false}),
    },
    {
      name: 'robots',
      type: 'string',
      title: 'Robots',
      initialValue: 'index, follow',
      group: 'seo',
    },
    {
      name: 'canonical',
      type: 'string',
      title: 'Canonique',
      description: "si vide, la canonique sera l'url de la page",
      group: 'seo',
    },
    {
      name: 'ogimage',
      type: 'image',
      title: "OpenGraph Image. Si vide, l'image renseignée dans Global sera utilisée",
      description: '1200x630 px',
      group: 'seo',
    },
    {
      name: 'schema',
      type: 'text',
      title: 'Schema',
      group: 'seo',
      description:
        'Ne pas copier la balise <script type="application/ld+json"> et </script> mais seulement le contenu avec les accolades',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [{type: 'block'}],
    },
  ],
}

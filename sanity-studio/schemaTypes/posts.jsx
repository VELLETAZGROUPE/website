const query = encodeURIComponent('*[_type == "global"]{cat}')
const url = `https://39ozs2jh.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
// fetch the content

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
        {type: 'feature'},
        {type: 'hero'},
        {type: 'section'},
        {type: 'tableofcontent'},
        {type: 'biglist'},
        {type: 'productlist'},
        {type: 'map'},
        {type: 'logogallery'},
        {type: 'actupreview'},
        {type: 'timeline'},
        {type: 'video'},
        {type: 'videobg'},
        {type: 'team'},
        {type: 'contactmap'},
        {type: 'testimonials'},
        {type: 'contactform'},
        {type: 'title'},
        {type: 'tabs'},
        {type: 'cta'},
        {type: 'biglist2'},
        {type: 'productlistcat'},
        {type: 'steps'},
        {type: 'faq'},
        {type: 'productlistall'},
        {type: 'imggallery'},
        {type: 'marqueelogo'},
        {type: 'marqueetext'},
      ],
    },
  ],
}

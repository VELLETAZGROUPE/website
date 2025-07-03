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

export default {
  name: 'page',
  type: 'document',
  title: 'Pages',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug',
    },
    prepare(selection) {
      let {title, subtitle} = selection
      if (subtitle == undefined) {
        subtitle = 'ACCUEIL - HOMEPAGE'
      }
      return {
        title: `${title}`,
        subtitle: `slug: ${subtitle}`,
      }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de la page',
      description: "Ce paramètre n'est pas utilisé pour le slug",
      validation: (Rule) => Rule.required().warning('Le nom de la page est obligatoire'),
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Dev only',
      description: "Permet de n'afficher une page qu'en mode dev",
      initialValue: true,
    },
    {
      name: 'footermin',
      type: 'boolean',
      title: 'Footer version minimale',
      description: 'Pour les landing pages',
      initialValue: false,
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
        {type: 'productlistcustom'},
        {type: 'imggallery'},
        {type: 'marqueelogo'},
        {type: 'marqueetext'},
        {type: 'motiondesign'},
        {type: 'scrolltelling'},
      ],
    },
  ],
}

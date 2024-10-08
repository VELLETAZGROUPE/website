export default {
  name: 'categories',
  type: 'document',
  title: 'Catégorie',
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
      description: "Ce paramètre n'est utilisé que dans le CMS et ne change pas le slug",
      validation: (Rule) => Rule.required().warning('Le nom de la page est obligatoire'),
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
        {type: 'block'},
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
        {type: 'team'},
        {type: 'contactmap'},
        {type: 'testimonials'},
        {type: 'contactform'},
        {type: 'title'},
        {type: 'tabs'},
        {type: 'cta'},
        {type: 'biglist2'},
      ],
    },
  ],
}

export default {
  name: 'global',
  type: 'document',
  title: 'Configuration globale du site',
  groups: [
    {name: 'blog', title: 'Blog'},
    {name: 'seo', title: 'SEO'},
    {name: 'menu', title: 'Menu'},
    {name: 'theme', title: 'Thème'},
    {name: 'social', title: 'Réseaux Sociaux'},
    {name: 'newsletter', title: 'Newsletter'},
  ],
  fields: [
    {
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'array',
          of: [{type: 'block'}, {type: 'button'}],
        },
        {
          name: 'placeholder',
          title: 'Email placeholder',
          type: 'string',
        },
        {
          name: 'btnname',
          title: 'Nom du bouton "Envoyer"',
          type: 'string',
        },
        {
          name: 'listID',
          title: 'ID de la liste BREVO',
          type: 'string',
        },
        {
          name: 'templateID',
          title: 'ID du template BREVO',
          type: 'string',
        },
        {
          name: 'redirect',
          title: 'URL de la page de redirection BREVO',
          type: 'reference',
          to: [{type: 'page'}],
        },
        {
          name: 'success',
          title: "Message à afficher en cas de succès de l'inscription",
          type: 'string',
        },
      ],
    },
    {
      name: 'redirects',
      type: 'array',
      title: 'Redirections',
      of: [
        {
          name: 'redirect',
          type: 'object',
          title: 'Redirection',
          fields: [
            {name: 'from', title: 'Depuis', type: 'string'},
            {name: 'to', title: "Jusqu'à", type: 'string'},
            {name: 'code', title: 'Code de Statut', type: 'string', description: '301 par défaut'},
            {
              name: 'force',
              title: 'Force',
              type: 'boolean',
              description: "forcer la redirection d'une page qui existe",
              initialValue: false,
            },
          ],
        },
      ],
      group: 'seo',
    },
    {
      name: 'cat',
      type: 'array',
      title: 'Catégories des articles de blog',
      of: [{type: 'string'}],
      group: 'blog',
    },
    {
      name: 'networks',
      type: 'array',
      title: 'Réseaux sociaux',
      description: 'Téléverser une image svg',
      group: 'social',
      of: [
        {
          name: 'network',
          type: 'object',
          title: 'Réseau social',
          fields: [
            {name: 'nom', type: 'string', title: 'Nom du réseau social'},
            {name: 'url', type: 'string', title: 'URL du lien'},
            {
              name: 'svg',
              type: 'inlineSvg',
              title: 'Icone',
            },
          ],
        },
      ],
    },
    {
      name: 'logo',
      title: 'SVG Logo',
      type: 'inlineSvg',
      group: 'theme',
    },
    {
      type: 'color',
      name: 'bodyColor',
      title: 'Couleur principale du texte',
      group: 'theme',
    },
    {
      type: 'color',
      name: 'bodydim1Color',
      title: 'Couleur du texte',
      description: 'diminution niveau 1',
      group: 'theme',
    },
    {
      type: 'color',
      name: 'bodydim2Color',
      title: 'Couleur du texte',
      description: 'diminution niveau 2',
      group: 'theme',
    },
    {
      type: 'color',
      name: 'bgColor',
      title: "Couleur principale de l'arrière plan",
      group: 'theme',
    },
    {
      type: 'color',
      name: 'accent1Color',
      title: "Couleur d'accentuation 1",
      group: 'theme',
    },
    {
      type: 'color',
      name: 'accent1dimColor',
      title: "Couleur d'accentuation 1",
      description: 'diminution',
      group: 'theme',
    },
    {
      type: 'color',
      name: 'accent2Color',
      title: "Couleur d'accentuation 2",
      group: 'theme',
    },
    {
      type: 'color',
      name: 'accent2dimColor',
      title: "Couleur d'accentuation 2",
      description: 'diminution',
      group: 'theme',
    },

    {
      type: 'color',
      name: 'themeColor',
      title: 'Couleur principale du site',
      description: "Utilisée pour la thématisation de l'environnement du site web.",
      group: 'theme',
    },
    {
      type: 'text',
      name: 'font',
      group: 'theme',
      title: 'Typographie',
      description:
        "Copier ici le CSS pour vos fontes. S'il y a plus d'une fontes, la première servira aux titres et la deuxième au texte.",
    },
    {
      name: 'favSVG',
      title: 'favicon SVG',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/svg+xml',
      },
    },
    {
      name: 'favmask',
      title: 'favicon Safari Pinned Tab',
      description: 'Le SVG doit être noir sur un fond transparent',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/svg+xml',
      },
    },
    {
      name: 'favtouch',
      title: 'favicon pour iOS',
      description: 'PNG de 180x180',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/png',
      },
    },
    {
      name: 'fav16',
      title: 'favicon 16x16 / anciens navigateurs',
      description: 'PNG de 16x16',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/png',
      },
    },
    {
      name: 'fav32',
      title: 'favicon 32x32 / anciens navigateurs',
      description: 'PNG de 32x32',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/png',
      },
    },
    {
      name: 'favico',
      title: 'favicon format ico / anciens navigateurs',
      description: 'ico 32x32',
      type: 'file',
      group: 'theme',
      options: {
        accept: '.ico',
      },
    },
    {
      name: 'favchrome',
      title: 'favicon pour le manifest PWA',
      description: 'PNG de 512x512',
      type: 'image',
      group: 'theme',
      options: {
        accept: 'image/png',
      },
    },
    {
      name: 'titleExtension',
      title:
        'À ajouter à la fin de la balise "title". Laisser vide si vous ne voulez pas insérer le nom de votre site dans les titles',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'ogImageFallback',
      title: 'Image utilisée par défaut lors du partage sur les réseaux sociaux.',
      type: 'image',
      group: 'seo',
    },
    {
      name: 'legal',
      type: 'array',
      title: 'Choix des pages légales',
      of: [
        {
          name: 'legalItem',
          type: 'reference',
          to: [{type: 'page'}],
        },
      ],
      group: 'menu',
    },
    {
      name: 'links',
      type: 'array',
      title: 'Items du menu',
      group: 'menu',
      of: [
        {
          name: 'link',
          type: 'object',
          title: 'Item du menu',
          fields: [
            {name: 'nom', type: 'string', title: 'Nom du lien'},
            {
              name: 'url',
              type: 'reference',
              title: 'URL du lien',
              to: [{type: 'page'}, {type: 'categories'}],
            },
            {
              name: 'urldirect',
              type: 'string',
              title: 'URL du lien (manuel)',
            },
            {
              name: 'subpages',
              type: 'array',
              title: 'Sous-pages',
              of: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Item du sous-menu',
                  fields: [
                    {name: 'nom', type: 'string', title: 'Nom du lien'},
                    {
                      name: 'url',
                      type: 'reference',
                      title: 'URL du lien',
                      to: [{type: 'page'}, {type: 'categories'}],
                    },
                    {
                      name: 'urldirect',
                      type: 'string',
                      title: 'URL du lien (manuel)',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default {
  name: 'img',
  type: 'document',
  title: 'Image',
  fields: [
    {
      name: 'img',
      title: 'Image',
      type: 'image',
      fields: [
        {name: 'alt', type: 'string'},
        {
          name: 'duotone',
          type: 'string',
          options: {
            list: [
              {title: 'Accent1', value: 'duoAccent1'},
              {title: 'Accent2', value: 'duoAccent2'},
            ],
          },
        },
      ],
    },
  ],
}

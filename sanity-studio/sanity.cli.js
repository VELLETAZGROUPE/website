import {defineCliConfig} from 'sanity/cli'
import {copyPastePlugin} from '@superside-oss/sanity-plugin-copy-paste'

export default defineCliConfig({
  api: {
    projectId: '39ozs2jh',
    dataset: 'production',
  },
  plugins: [copyPastePlugin()],
  vite: (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        target: 'esnext',
      },
    }
  },
})

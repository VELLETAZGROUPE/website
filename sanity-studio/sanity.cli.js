import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '39ozs2jh',
    dataset: 'production',
  },
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

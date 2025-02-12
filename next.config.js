module.exports = {
  env: {
    WEAPON_JSON: process.env.WEAPON_JSON,
    MODULE_JSON: process.env.MODULE_JSON,
    STAT_JSON: process.env.STAT_JSON,
    DESCENDANT_JSON: process.env.DESCENDANT_JSON,
    REACTOR_JSON: process.env.REACTOR_JSON,
    EXTERNAL_COMPONENT_JSON: process.env.EXTERNAL_COMPONENT_JSON,
    BASE_URL: process.env.BASE_URL,
    ATEK_JSON: process.env.ATEK_JSON,
    ATEK_FORMATIONS_API: process.env.ATEK_FORMATIONS_API,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  staticPageGenerationTimeout: 600,
}

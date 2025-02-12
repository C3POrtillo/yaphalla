module.exports = {
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

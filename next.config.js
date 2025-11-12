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
  redirects: async () => [
    {
      source: '/resume',
      destination: '/resume.pdf',
      permanent: true,
    },
  ],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  staticPageGenerationTimeout: 600,
}

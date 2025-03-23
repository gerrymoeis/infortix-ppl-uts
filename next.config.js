/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dicoding-web-img.sgp1.cdn.digitaloceanspaces.com',
      'dicoding.com',
      'www.dicoding.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dicoding-web-img.sgp1.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.dicoding.com',
        pathname: '/**',
      }
    ]
  }
}

module.exports = nextConfig

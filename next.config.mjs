/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/transcribe',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value:
              'https://falaqueeuteescuto-git-bugfix-timeout-julianosill-projects.vercel.app/',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST',
          },
        ],
      },
    ]
  },
}

export default nextConfig

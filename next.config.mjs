/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:9991/api',
    API_URL_WSK: 'http://localhost:8089',
    URL_MAIN: 'http://localhost:3002',
  },

  // Dev
  // env: {
  //   URL_MAIN: 'https://vn.ku6018.net',
  //   API_URL: 'https://api.royalcsn.fun/api',
  //   API_URL_WSK: 'https://ws.royalcsn.fun',
  // },
  // Production
  // env: {
  //   URL_MAIN: 'https://vn.ku6018.net',
  //   API_URL: 'https://codonviai.ku6018.net/api',
  //   API_URL_WSK: 'https://ws.ku6018.net',
  // },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/Home',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
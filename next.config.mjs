/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ya-go.mx',
            pathname: '/wp-content/uploads/2024/06/logo-ya-go.png',
          },
        ],
      },
};

export default nextConfig;

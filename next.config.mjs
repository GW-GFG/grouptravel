/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'media.istockphoto.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https', 
                hostname: 'www.science.org', 
                port: '',
                pathname: '/**', 
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/**',
            },
          ],
        
        },
};

export default nextConfig;

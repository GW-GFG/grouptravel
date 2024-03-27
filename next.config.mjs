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
        // async headers() {
        //   return [
        //     {
        //       source: "https://grouptravel-b-gwgfg.vercel.app/",
        //       headers: [
        //         { key: "Access-Control-Allow-Origin", value: "*" },
        //         { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
        //         { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Authorization" },
        //         { key: "Access-Control-Allow-Credentials", value: "true" }
        //       ]
        //     },
        // //     {
        // //       source: "/",
        // //       headers: [
        // //         { key: "Access-Control-Allow-Origin", value: "https://grouptravelgw-gfg.vercel.app" },
        // //         { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
        // //         { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Authorization" },
        // //         { key: "Access-Control-Allow-Credentials", value: "true" }
        // //       ]
        // //     }
        //   ];
        // }
};

export default nextConfig;

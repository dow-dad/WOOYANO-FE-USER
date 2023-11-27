/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    typedRoutes: true,
  },
  env:{
    TOSSPAYMENTS_CLIENT_KEY:process.env.TOSSPAYMENTS_CLIENT_KEY,
    TOSSPAYMENTS_CUSTOM_KEY:process.env.TOSSPAYMENTS_CUSTOM_KEY,
    TOSS_PAYMENTS_SECRET_KEY:process.env.TOSS_PAYMENTS_SECRET_KEY,
    NEXT_PUBLIC_API_BASE_URL:process.env.NEXT_PUBLIC_API_BASE_URL,
    AWS_REGION:process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    OPENAI_API_KEY:process.env.OPENAI_API_KEY

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.daumcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wooyano.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "zrr.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dmmj3ljielax6.cloudfront.net",
        port: "",
        pathname: "/**",
      },

      
    ],
  },
};

module.exports = nextConfig;

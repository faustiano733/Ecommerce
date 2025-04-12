
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME:process.env.DATABASE_NAME,
    DATABASE_USER:process.env.DATABASE_USER,
    DATABASE_PASSWORD:process.env.DATABASE_PASSWORD,
    USER_EMAIL:process.env.USER_EMAIL,
    EMAIL_KEY:process.env.EMAIL_KEY
    },
};

export default nextConfig;

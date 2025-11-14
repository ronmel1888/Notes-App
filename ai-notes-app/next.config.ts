import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Catch React issues in development      // Faster builds
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, // OpenAI API key
    MONGODB_URI: process.env.MONGODB_URI        // MongoDB connection string
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns:[
      new URL("https://evxcnutndqpgogsojtoq.supabase.co/**/*")
    ]
  }
};

export default nextConfig;

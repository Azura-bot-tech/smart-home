const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/icons-material', '@mui/material']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Enable gzip compression
  compress: true
};

// Combine configurations
module.exports = withBundleAnalyzer(withPWA(nextConfig));

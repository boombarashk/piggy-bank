import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Включаем строгий режим React (рекомендуется)
  turbopack: {
    root: path.join(__dirname, ".."),
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js", // Treat SVG imports as JavaScript modules (React components)
      },
    },
  },
  experimental: {
    scrollRestoration: true, // Экспериментальная поддержка восстановления прокрутки
  },
  webpack(config) {
    // Добавляем правила для Webpack здесь, если нужно
    return config;
  },
};

export default nextConfig;

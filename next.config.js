/*const nextConfig = {
  output: 'export', //todo delete Outputs a Single-Page Application (SPA)
  distDir: 'build', // Changes the build output directory to `build`
}
 
export default nextConfig
*/

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      // Настройки для разработки
      devIndicators: false, // { position: 'bottom-right' }, Позиция индикатора сборки во время разработки
    };
  }

  const config = {
    reactStrictMode: true, // Включаем строгий режим React (рекомендуется)
    swcMinify: true, // Используем SWC для минификации (быстрее, чем Babel)
    /*images: {
      domains: ['example.com'],                // Домены для изображений (если используете CDN)
    },*/
    experimental: {
      scrollRestoration: true, // Экспериментальная поддержка восстановления прокрутки
    },
    webpack(config) {
      // Добавляем правила для Webpack здесь, если нужно
      return config;
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/categories",
          permanent: true,
        },
      ];
    },
  };

  return config;
};

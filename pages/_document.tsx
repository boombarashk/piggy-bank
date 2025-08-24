import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#3d3d3d" />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="use-credentials"
          />
          <link
            href="//fonts.googleapis.com/css?family=Istok+Web:normal,bold,italic,bolditalic"
            rel="stylesheet"
          />
          <link
            href="//fonts.googleapis.com/css?family=Material+Icons"
            rel="stylesheet"
          />

          {/* базовые CSS-стили */}
          <link rel="stylesheet" href="/styles.css" />

          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <body className="font-body antialiased">
          <Main /> {/* Основная разметка страницы */}
          <NextScript /> {/* Скрипты Next.js */}
        </body>
      </Html>
    );
  }
}

export default AppDocument;

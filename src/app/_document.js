import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Venda de acessórios para material fotográfico."
          />
          <meta name="author" content="Nataniel Hebo, Faustiano Geraldo" />
          <meta property="og:title" content="E-commerce Bemtoc" />
          <meta
            property="og:description"
            content="Venda de acessórios para material fotográfico."
          />
          <title>E-commerce Bemtoc</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

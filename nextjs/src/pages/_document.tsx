import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
        <title>토스페이먼츠 샘플 프로젝트</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

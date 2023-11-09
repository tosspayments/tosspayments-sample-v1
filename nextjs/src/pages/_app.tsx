import type { AppProps } from "next/app";
import Head from 'next/head'
import '../../public/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>토스페이먼츠 샘플 프로젝트</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

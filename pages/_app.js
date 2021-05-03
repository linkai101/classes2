import '../styles/globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../lib/auth";
import theme from '../lib/theme';
import config from '../config';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config.titleDefault}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A simple, efficient class and task manager."
        />
      </Head>
      
      <ChakraProvider theme={theme} resetCSS>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
import ProptTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../components/styles/nprogress.css';
import Layout from '../components/Layout';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
MyApp.ProptTypes = {
  Component: ProptTypes.elementType,
  pageProps: ProptTypes.any,
};

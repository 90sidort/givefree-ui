import ProptTypes from "prop-types";
import NProgress from "nprogress";
import Router from "next/router";

import "../components/styles/nprogress.css";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
MyApp.ProptTypes = {
  Component: ProptTypes.elementType,
  pageProps: ProptTypes.any,
};

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);

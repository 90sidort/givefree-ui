import React from "react";
import ProptTypes from "prop-types";
import NProgress from "nprogress";
import Router from "next/router";

import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import Layout from "../components/Layout";
import withData from "../lib/withData";
import { WishlistStateProvider } from "../lib/WishlistState";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <WishlistStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WishlistStateProvider>
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

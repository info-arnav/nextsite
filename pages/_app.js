import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import "../styles/css.scss";
import "../styles/404.css";
import "../styles/globals.css";
import Router from "next/router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <script type="application/ld+json">
          {{
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "http://www.arnavgupta.net",
            logo: "http://www.arnavgupta.net/logo.png",
          }}
        </script>
        <link
          rel="icon"
          href={"/favicon.ico"}
          alt="The logo of the website which showcases a symbol of infinity combined to wires"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href={"/logo.webp"} />
        <link rel="manifest" href={"/manifest.json"} />
        <meta property="og:url" content="https://www.arnavgupta.net/" />
        <meta
          property="og:image"
          content={"https://www.arnavgupta.net/logo.webp"}
          alt="The logo of the website which showcases a symbol of infinity combined to wires"
        />
        <meta property="og:site_name" content={"Infinity"} />
        <meta property="fb:app_id" content="807904256677081" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@infinity" />
        <meta
          name="twitter:image"
          content={"https://www.arnavgupta.net/logo.webp"}
          alt="The logo of the website which showcases a symbol of infinity combined to wires"
        />
        <meta
          name="twitter:image:alt"
          content="The logo of the website which showcases a symbol of infinity combined to wires"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

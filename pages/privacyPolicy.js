import Head from "next/head";
import Footer from "./api/footer";
import Navigation from "./api/navigation";

export default function About() {
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              colleague: [],
              image: "https://www.arnavgupta.net/logo.webp",
              name: "Arnav Gupta",
              url: "https://www.arnavgupta.net/privacyPolicy",
              sameAs: [
                "https://www.youtube.com/channel/UCzzfqCy-j9XZA5KNosqzh6w",
                "https://www.instagram.com/nfinity.newTechnology/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <title>Infinity | Privacy Policy</title>
        <meta property="og:title" content="Infinity | Privacy Policy" />
        <meta name="twitter:title" content="Infinity | Privacy Policy" />
        <meta
          name="description"
          content="Privacy | Infinity takes cares about your data and are ready to tell you about everything we collect and why..
"
        />
        <meta
          property="og:description"
          content="Privacy | Infinity takes cares about your data and are ready to tell you about everything we collect and why..
"
        />
        <meta
          name="twitter:description"
          content="Privacy | Infinity takes cares about your data and are ready to tell you about everything we collect and why..
"
        />
      </Head>
      <Navigation />
      <Footer></Footer>
    </div>
  );
}

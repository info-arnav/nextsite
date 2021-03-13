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
              url: "https://www.arnavgupta.net/about",
              sameAs: [
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <title>Infinity | About</title>
        <meta property="og:title" content="Infinity | About" />
        <meta name="twitter:title" content="Infinity | About" />
        <meta
          name="description"
          content="About Us | Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
        <meta
          property="og:description"
          content="About Us | Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
        <meta
          name="twitter:description"
          content="About Us | Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
      </Head>
      <Navigation />
      <Footer></Footer>
    </div>
  );
}

import Head from "next/head";
import { Row, Col, Image } from "react-bootstrap";
import Navigation from "./api/navigation";
import Footer from "./api/footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  useEffect(() => {}, []);
  const router = useRouter();
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
              url: "https://www.arnavgupta.net/",
              sameAs: [
                "https://www.youtube.com/channel/UCzzfqCy-j9XZA5KNosqzh6w",
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <title>Infinity | Live thousand lives in one world</title>
        <meta
          property="og:title"
          content="Infinity | Live thousand lives in one world"
        />
        <meta
          name="twitter:title"
          content="Infinity | Live thousand lives in one world"
        />
        <meta
          name="description"
          content="Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
        <meta
          property="og:description"
          content="Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
        <meta
          name="twitter:description"
          content="Infinity is both like a website and a diary. A place where all people across the globe get a chance to put their views and talent in front of everyone.
"
        />
      </Head>
      <Navigation />
      <div></div>
      <Footer></Footer>
    </div>
  );
}

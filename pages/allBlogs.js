import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "./api/footer";
import jwts from "njwt";
import Navigation from "./api/navigation";

export default function Blogs() {
  const router = useRouter();
  const [status, setStatus] = useState("loggedOut");
  useEffect(() => {
    localStorage.getItem("userData")
      ? jwts.verify(
          localStorage.getItem("userData"),
          "Arnav30080422020731017817087571441",
          (err, verifiedJwt) => {
            if (err) {
              router.push("/");
            } else {
              setStatus("loggedIn");
            }
          }
        )
      : router.push("/");
  }, []);
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
              url: "https://www.arnavgupta.net/allBlogs",
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
        <title>Infinity | Blogs</title>
        <meta property="og:title" content="Infinity | Blogs" />
        <meta name="twitter:title" content="Infinity | Blogs" />
        <meta
          name="description"
          content="You can find posts from various people you follow here. Follow more people to see interesting posts."
        />
        <meta
          property="og:description"
          content="You can find posts from various people you follow here. Follow more people to see interesting posts."
        />
        <meta
          name="twitter:description"
          content="You can find posts from various people you follow here. Follow more people to see interesting posts."
        />
      </Head>
      <Navigation />
      <Footer></Footer>
    </div>
  );
}

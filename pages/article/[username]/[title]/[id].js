import Head from "next/head";
import Footer from "../../../api/footer";
import Navigation from "../../../api/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import jwts from "jwt-simple";

export default function Article({ res }) {
  const router = useRouter();
  const { username, title, id } = router.query;
  const [data, setData] = useState({ blog: "" });
  useEffect(() => {
    const update = async () => {
      localStorage.getItem("userData")
        ? jwts.decode(
            localStorage.getItem("userData"),
            "Arnav30080422020731017817087571441"
          ).username
          ? await axios.post("/api/add/views", {
              user: jwts.decode(
                localStorage.getItem("userData"),
                "Arnav30080422020731017817087571441"
              ).username,
              post: id,
            })
          : ""
        : "";
    };
    setData(res.data.data);
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
              url: `https://www.arnavgupta.net/article/${res.username}/${res.title}/${res.id}`,
              sameAs: [
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.arnavgupta.net/article/${res.username}/${res.title}/${res.id}`,
              },
              headline: res.title,
              image: [data.image],
              datePublished: "",
              dateModified: "",
              author: {
                "@type": "Person",
                name: res.username,
              },
              publisher: {
                "@type": "Organization",
                name: "Infinity",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.arnavgupta.net/logo.webp",
                },
              },
            }),
          }}
        />
        <title>Infinity | {res.title}</title>
        <meta property="og:title" content={`Infinity | ${res.title}`} />
        <meta name="twitter:title" content={`Infinity | ${res.title}`} />
        <meta
          name="description"
          content={`${res.title} | by ${res.username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          property="og:description"
          content={`${res.title} | by ${res.username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          name="twitter:description"
          content={`${res.title} | by ${res.username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
      </Head>
      <Navigation />
      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const res = {
    id: params.id,
    username: params.username,
    title: params.title,
  };
  res.data = await fetch(`https://www.arnavgupta.net/api/single/${params.id}`);
  return {
    props: { res },
  };
}

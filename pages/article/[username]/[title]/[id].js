import Head from "next/head";
import Footer from "../../../api/footer";
import Navigation from "../../../api/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import jwts from "jwt-simple";

export default function Article() {
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
    async function fetcher() {
      await axios
        .get(`/api/single/${id}`)
        .then((res) => setData(res.data))
        .catch((e) => {
          if (e.response) {
          }
        });
    }
    async function fetcher2() {
      await axios
        .get(`/api/single/${id}`)
        .then((res) => setData(res.data))
        .catch((e) => {
          if (e.response) {
            router.push("/");
          }
        });
    }
    fetcher();
    fetcher2();
    update();
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
              image: "https://www.arnavgupta.net/logo.png",
              name: "Arnav Gupta",
              url: `https://www.arnavgupta.net/article/${username}/${title}/${id}`,
              sameAs: [],
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
                "@id": `https://www.arnavgupta.net/article/${username}/${title}/${id}`,
              },
              headline: title,
              image: ["https://www.arnavgupta.net/logo.png"],
              datePublished: "",
              dateModified: "",
              author: {
                "@type": "Person",
                name: username,
              },
              publisher: {
                "@type": "Organization",
                name: "Infinity",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.arnavgupta.net/logo.png",
                },
              },
            }),
          }}
        />
        <title>Infinity | {title}</title>
        <meta property="og:title" content={`Infinity | ${title}`} />
        <meta name="twitter:title" content={`Infinity | ${title}`} />
        <meta
          name="description"
          content={`${title} | by ${username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          property="og:description"
          content={`${title} | by ${username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          name="twitter:description"
          content={`${title} | by ${username} | ${data.blog
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

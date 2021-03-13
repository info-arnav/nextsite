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
  const [params, setParams] = useState([]);
  useEffect(() => {
    typeof window == undefined
      ? ""
      : setParams(window.location.pathname.split("/"));
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
        .get(`/api/single/${params[2]}`)
        .then((res) => setData(res.data))
        .catch(async (e) => {
          if (e.response) {
            await axios
              .get(`/api/single/${params[2]}`)
              .then((res) => setData(res.data))
              .catch((e) => {
                if (e.response) {
                  router.push("/");
                }
              });
          }
        });
    }

    fetcher();
    update();
  }, [id]);
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
              url: `https://www.arnavgupta.net/article/${params[0]}/${params[1]}/${params[2]}`,
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
                "@id": `https://www.arnavgupta.net/article/${params[0]}/${params[1]}/${params[2]}`,
              },
              headline: title,
              image: ["https://www.arnavgupta.net/logo.webp"],
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
                  url: "https://www.arnavgupta.net/logo.webp",
                },
              },
            }),
          }}
        />
        <title>Infinity | {params[1]}</title>
        <meta property="og:title" content={`Infinity | ${params[1]}`} />
        <meta name="twitter:title" content={`Infinity | ${params[1]}`} />
        <meta
          name="description"
          content={`${params[1]} | by ${params[0]} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          property="og:description"
          content={`${params[0]} | by ${params[1]} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          name="twitter:description"
          content={`${params[0]} | by ${params[1]} | ${data.blog
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

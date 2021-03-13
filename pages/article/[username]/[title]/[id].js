import Head from "next/head";
import Footer from "../../../api/footer";
import Navigation from "../../../api/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import jwts from "jwt-simple";

export default function Article({ res }) {
  const [data, setData] = useState(res.data);
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
              post: data._id,
            })
          : ""
        : "";
    };
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
              image: "https://www.arnavgupta.net/logo.webp",
              name: "Arnav Gupta",
              url: `https://www.arnavgupta.net/article/${data.username}/${data.title}/${data._id}`,
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
                "@id": `https://www.arnavgupta.net/article/${data.username}/${data.title}/${data._id}`,
              },
              headline: data.title,
              image: ["https://www.arnavgupta.net/logo.webp"],
              datePublished: "",
              dateModified: "",
              author: {
                "@type": "Person",
                name: data.username,
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
        <title>Infinity | {data.title}</title>
        <meta property="og:title" content={`Infinity | ${data.title}`} />
        <meta name="twitter:title" content={`Infinity | ${data.title}`} />
        <meta
          name="description"
          content={`${data.title} | by ${data.username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          property="og:description"
          content={`${data.title} | by ${data.username} | ${data.blog
            .toString()
            .replace(
              /(<([^>]+)>)/gi,
              data.blog.toString().slice(0, data.blog.indexOf("."))
            )
            .slice(0, 15)}`}
        />
        <meta
          name="twitter:description"
          content={`${data.title} | by ${data.username} | ${data.blog
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

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const id = context.parmas.id;
  const res = await fetch(`/api/single/${id}`);

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      res,
    },
  };
}

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
  const [data, setData] = useState(res);
  useEffect(() => {
    const update = async () => {
      localStorage.getItem("userData")
        ? jwts.verify(
            localStorage.getItem("userData"),
            "Arnav30080422020731017817087571441",
            async (err, verifiedJwt) => {
              if (err) {
                ("");
              } else {
                await axios.post("/api/add/views", {
                  user: verifiedJwt.body.username,
                  post: id,
                });
              }
            }
          )
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
              url: `https://www.arnavgupta.net/article/${username}/${title}/${id}`,
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
                "@id": `https://www.arnavgupta.net/article/${username}/${title}/${id}`,
              },
              headline: title,
              image: [data.image],
              datePublished: data.date,
              dateModified: data.date,
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
        <title>Infinity | {title}</title>
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitterc"
        />
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
        <meta
          name="twitter:image"
          key="twitteri"
          content={data.image}
          alt="The display picture of the post"
        />
        <meta
          name="twitter:image:alt"
          key="twitteria"
          content="The display picture of the post"
        />
      </Head>

      <Navigation />
      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  let response = {
    data: {
      date: "date",
      ddate: "ddate",
      likes: [],
      bookmarks: [],
      views: [],
      comments: [],
      _id: "6048646cb36f7b029c05210e",
      tags: "tags",
      image: "logo.png",
      blog: "blog",
      title: "title",
      userdp: "logo.png",
      username: "username",
      __v: 0,
    },
  };
  await axios
    .get(`https://www.arnavgupta.net/api/single/${params.id}`)
    .then(async (e) => {
      response = e;
    })
    .catch(async (error) => {
      if (error.response) {
        response = await axios.get(
          `https://www.arnavgupta.net/api/single/${params.id}`
        );
      }
    });
  const res = response.data;
  return {
    props: { res },
  };
}

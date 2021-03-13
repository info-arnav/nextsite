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
          content="About Us | Infinity offers an opportunity to every blogger out there to display their thoughts in front of everyone. ‘Better to write for yourself and have no public, than to write for the public and have no self’. Passionate bloggers is a website where you can write your thoughts and let people live in a thousand worlds before they die."
        />
        <meta
          property="og:description"
          content="About Us | Infinity offers an opportunity to every blogger out there to display their thoughts in front of everyone. ‘Better to write for yourself and have no public, than to write for the public and have no self’. Passionate bloggers is a website where you can write your thoughts and let people live in a thousand worlds before they die."
        />
        <meta
          name="twitter:description"
          content="About Us | Infinity offers an opportunity to every blogger out there to display their thoughts in front of everyone. ‘Better to write for yourself and have no public, than to write for the public and have no self’. Passionate bloggers is a website where you can write your thoughts and let people live in a thousand worlds before they die."
        />
      </Head>
      <Navigation />
      <Footer></Footer>
    </div>
  );
}

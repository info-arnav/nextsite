import Head from "next/head";
import { Row, Col, Image } from "react-bootstrap";
import Navigation from "./api/navigation";
import Footer from "./api/footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home({ res }) {
  useEffect(() => {}, []);
  const router = useRouter();
  const [ml, sml] = useState(res[0][0]); // mostLiked
  const [rp, srp] = useState(res[1]); //recent posts
  const [tp, stp] = useState(res[2]); //top posts
  const [mv, smv] = useState(res[3]); //most viewed
  const [ap, sap] = useState(res[4]); //all posts

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
      <Navigation />(
      <div>
        <Row
          style={{
            width: "calc(100% - 30px)",
            borderRadius: "20px",
            backgroundImage: `url("${ml.image}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginLeft: "15px",
            marginRight: "15px",
          }}
          className="hoverBox"
        >
          <Link href={`/article/${ml.username}/${ml.title}/${ml._id}`}>
            <a
              href={`/article/${ml.username}/${ml.title}/${ml._id}`}
              style={{
                marginLeft: "auto",
                height: "500px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                width: "60%",
                marginRight: "auto",
                top: "50%",
                maxWidth: "564px",
                left: "50%",
                textAlign: "center",
                backgroundColor: "rgb(255 255 255 / 69%)",
              }}
            >
              <div style={{ width: "90%" }}>
                <p style={{}}>
                  <Image
                    alt="userdp"
                    src={ml.userdp}
                    height="40px"
                    roundedCircle
                  />{" "}
                </p>
                <br></br>
                <p>
                  <h4>{ml.title}</h4>
                </p>
                <p>
                  by {ml.username} on {ml.ddate}
                </p>
                <br></br>
                <p>{ml.blog}</p>
              </div>
            </a>
          </Link>
        </Row>
        <br></br>
        <Row
          style={{
            width: "calc(100% - 30px)",
            borderRadius: "20px",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <Col
            md={8}
            style={{
              height: "500px",
              margin: "5px",
              padding: "0",
              borderRadius: "20px",
              justifyContent: "bottom",
              alignItems: "bottom",
              backgroundImage: `url("${rp[0].image}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
            }}
          >
            <Link
              href={`/article/${rp[0].username}/${rp[0].title}/${rp[0]._id}`}
            >
              <a
                href={`/article/${rp[0].username}/${rp[0].title}/${rp[0]._id}`}
                style={{
                  borderRadius: "20px",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#00000070",
                  alignItems: "center",
                  display: "flex",
                }}
                className="hoverBox"
              >
                <span
                  style={{
                    color: "white",
                    paddingLeft: "15px",
                    paddingTop: "400px",
                    color: "white",
                  }}
                >
                  <h1>{rp[0].title}</h1>
                  <p
                    style={{
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    by {rp[0].username} on {rp[0].ddate}
                  </p>
                </span>
              </a>
            </Link>
          </Col>
          <Col
            style={{
              height: "500px",
              borderRadius: "20px",
              backgroundRepeat: "no-repeat",
              padding: "0",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Row
              style={{
                height: "calc(60% - 5px)",
                margin: "5px",
                borderRadius: "20px",
                backgroundImage: `url("${rp[1].image}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Link
                href={`/article/${rp[1].username}/${rp[1].title}/${rp[1]._id}`}
              >
                <a
                  href={`/article/${rp[1].username}/${rp[1].title}/${rp[1]._id}`}
                  style={{
                    borderRadius: "20px",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#00000070",
                    display: "flex",
                  }}
                  className="hoverBox"
                >
                  <span
                    style={{
                      paddingLeft: "15px",
                      paddingTop: "200px",
                      color: "white",
                    }}
                  >
                    <h1>{rp[1].title}</h1>
                    <p
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      by {rp[1].username} on {rp[1].ddate}
                    </p>
                  </span>
                </a>
              </Link>
            </Row>
            <Row
              style={{
                borderRadius: "20px",
                backgroundImage: `url(${rp[2].image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "calc(40% - 5px)",
                margin: "5px",
                width: "100%",
              }}
            >
              <Link
                href={`/article/${rp[2].username}/${rp[2].title}/${rp[2]._id}`}
              >
                <a
                  href={`/article/${rp[2].username}/${rp[2].title}/${rp[2]._id}`}
                  style={{
                    borderRadius: "20px",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#00000070",
                    alignItems: "center",
                    display: "flex",
                  }}
                  className="hoverBox"
                >
                  <span
                    style={{
                      paddingLeft: "15px",
                      paddingTop: "100px",
                      color: "white",
                    }}
                  >
                    <h1>{rp[2].title}</h1>
                    <p
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      by {rp[2].username} on {rp[2].ddate}
                    </p>
                  </span>
                </a>
              </Link>
            </Row>
          </Col>
        </Row>
        <br></br>{" "}
        <Row
          style={{
            width: "calc(100% - 30px)",
            borderRadius: "20px",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <Col
            md={4}
            style={{
              margin: "5px",
              borderRadius: "20px",
              height: "500px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="hoverBox"
          >
            <Link
              href={`/article/${tp[0].username}/${tp[0].title}/${tp[0]._id}`}
            >
              <a
                href={`/article/${tp[0].username}/${tp[0].title}/${tp[0]._id}`}
              >
                <Image src={tp[0].image} width="100%" height="60%"></Image>
                <h2 style={{ paddingBottom: "5px" }}>{tp[0].title}</h2>
                <p
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  by {tp[0].username} on {tp[0].date}
                </p>
                <p>{tp[0].blog}</p>
              </a>
            </Link>
          </Col>
          <Col
            md={4}
            style={{
              margin: "5px",
              borderRadius: "20px",
              height: "500px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link
              href={`/article/${tp[1].username}/${tp[1].title}/${tp[1]._id}`}
            >
              <a
                href={`/article/${tp[1].username}/${tp[1].title}/${tp[1]._id}`}
              >
                <Row
                  style={{
                    borderRadius: "20px",
                    height: "calc(25% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="hoverBox"
                >
                  <div
                    md={4}
                    style={{
                      width: "30%",
                      display: "inline",
                      height: "100%",
                    }}
                  >
                    <Image src={tp[1].image} height="100%" width="100%"></Image>
                  </div>
                  <div style={{ display: "inline", width: "70%" }}>
                    <p
                      style={{
                        color: "red",
                        paddingBottom: "8px",
                        fontSize: "10px",
                      }}
                    >
                      <b>{tp[1].tags}</b>
                    </p>
                    <h5>{tp[1].title}</h5>
                    <p
                      style={{
                        color: "grey",
                        fontSize: "12px",
                      }}
                    >
                      by {tp[1].username} on {tp[1].date}
                    </p>
                  </div>
                </Row>
              </a>
            </Link>
            <Link
              href={`/article/${tp[2].username}/${tp[2].title}/${tp[2]._id}`}
            >
              <a
                href={`/article/${tp[2].username}/${tp[2].title}/${tp[2]._id}`}
              >
                <Row
                  className="hoverBox"
                  style={{
                    borderRadius: "20px",
                    height: "calc(25% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    md={4}
                    style={{
                      width: "30%",
                      display: "inline",
                      height: "100%",
                    }}
                  >
                    <Image src={tp[2].image} height="100%" width="100%"></Image>
                  </div>
                  <div style={{ display: "inline", width: "70%" }}>
                    <p
                      style={{
                        color: "purple",
                        paddingBottom: "8px",
                        fontSize: "10px",
                      }}
                    >
                      <b>{tp[2].tags}</b>
                    </p>
                    <h5>{tp[2].title}</h5>
                    <p
                      style={{
                        color: "grey",
                        fontSize: "12px",
                      }}
                    >
                      by {tp[2].username} on {tp[2].date}
                    </p>
                  </div>
                </Row>
              </a>
            </Link>
            <Link
              href={`/article/${tp[3].username}/${tp[3].title}/${tp[3]._id}`}
            >
              <a
                href={`/article/${tp[3].username}/${tp[3].title}/${tp[3]._id}`}
              >
                <Row
                  className="hoverBox"
                  style={{
                    borderRadius: "20px",
                    height: "calc(25% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    md={4}
                    style={{
                      width: "30%",
                      display: "inline",
                      height: "100%",
                    }}
                  >
                    <Image src={tp[3].image} height="100%" width="100%"></Image>
                  </div>
                  <div style={{ display: "inline", width: "70%" }}>
                    <p
                      style={{
                        color: "blue",
                        paddingBottom: "8px",
                        fontSize: "10px",
                      }}
                    >
                      <b>{tp[3].tags}</b>
                    </p>
                    <h5>{tp[3].title}</h5>
                    <p
                      style={{
                        color: "grey",
                        fontSize: "12px",
                      }}
                    >
                      by {tp[3].username} on {tp[3].date}
                    </p>
                  </div>
                </Row>
              </a>
            </Link>
            <Link
              href={`/article/${tp[4].username}/${tp[4].title}/${tp[4]._id}`}
            >
              <a
                href={`/article/${tp[4].username}/${tp[4].title}/${tp[4]._id}`}
              >
                <Row
                  className="hoverBox"
                  style={{
                    borderRadius: "20px",
                    height: "calc(25% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    md={4}
                    style={{
                      width: "30%",
                      display: "inline",
                      height: "100%",
                    }}
                  >
                    <Image src={tp[4].image} height="100%" width="100%"></Image>
                  </div>
                  <div style={{ display: "inline", width: "70%" }}>
                    <p style={{ paddingBottom: "8px", fontSize: "10px" }}>
                      <b>{tp[4].tags}</b>
                    </p>
                    <h5>{tp[4].title}</h5>
                    <p
                      style={{
                        color: "grey",
                        fontSize: "12px",
                      }}
                    >
                      by {tp[4].username} on {tp[4].date}
                    </p>
                  </div>
                </Row>
              </a>
            </Link>
          </Col>
          <Col
            style={{
              height: "500px",
              borderRadius: "20px",
              backgroundRepeat: "no-repeat",
              padding: "0",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Row
              style={{
                height: "calc(30% - 5px)",
                margin: "5px",
                borderRadius: "20px",

                backgroundImage: `url(${mv[0].image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <Link
                href={`/article/${mv[0].username}/${mv[0].title}/${mv[0]._id}`}
              >
                <a
                  href={`/article/${mv[0].username}/${mv[0].title}/${mv[0]._id}`}
                  className="hoverBox"
                  style={{
                    borderRadius: "20px",
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#00000070",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      paddingLeft: "15px",
                      paddingTop: "40px",
                      color: "white",
                    }}
                  >
                    <h1>{mv[0].title}</h1>
                    <p
                      style={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      by {mv[0].username} on {mv[0].ddate}
                    </p>
                  </span>
                </a>
              </Link>
            </Row>
            <Row
              style={{
                borderRadius: "20px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "calc(70% - 5px)",
                margin: "5px",
                width: "100%",
              }}
            >
              <Row
                style={{
                  borderRadius: "20px",
                  backgroundImage: `url("${mv[1].image}")`,
                  width: "100%",
                  margin: "5px",
                  height: "calc(33% - 5px)",
                  marginTop: "5px",
                  marginBottom: "5px",
                  verticalAlign: "bottom",
                  display: "table-cell",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Link
                  href={`/article/${mv[1].username}/${mv[1].title}/${mv[1]._id}`}
                >
                  <a
                    href={`/article/${mv[1].username}/${mv[1].title}/${mv[1]._id}`}
                    className="hoverBox"
                    style={{
                      borderRadius: "20px",
                      height: "100%",
                      display: "flex",
                      alignItems: "bottom",
                      justifyContent: "bottom",
                      bottom: "10px",
                      width: "100%",
                      backgroundColor: "#00000070",
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: "15px",
                        paddingTop: "20px",
                        color: "white",
                      }}
                    >
                      <h1>{mv[1].title}</h1>
                      <p
                        style={{
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        by {mv[1].username} on {mv[1].ddate}
                      </p>
                    </span>
                  </a>
                </Link>
              </Row>
              <Link
                href={`/article/${tp[5].username}/${tp[5].title}/${tp[5]._id}`}
              >
                <a
                  style={{
                    borderRadius: "20px",
                    height: "calc(33% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  href={`/article/${tp[5].username}/${tp[5].title}/${tp[5]._id}`}
                >
                  <Row
                    className="hoverBox"
                    style={{
                      borderRadius: "20px",
                      height: "100%",
                      marginTop: "5px",
                      marginBottom: "5px",
                      width: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      md={4}
                      style={{
                        width: "30%",
                        display: "inline",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={tp[5].image}
                        height="100%"
                        width="100%"
                      ></Image>
                    </div>
                    <div style={{ display: "inline", width: "70%" }}>
                      <p
                        style={{
                          color: "purple",
                          paddingBottom: "8px",
                          fontSize: "10px",
                        }}
                      >
                        <b>{tp[5].tags}</b>
                      </p>
                      <h5>{tp[5].title}</h5>
                      <p
                        style={{
                          color: "grey",
                          fontSize: "12px",
                        }}
                      >
                        by {tp[5].username} on {tp[5].date}
                      </p>
                    </div>
                  </Row>
                </a>
              </Link>
              <Link
                href={`/article/${tp[6].username}/${tp[6].title}/${tp[6]._id}`}
              >
                <a
                  style={{
                    borderRadius: "20px",
                    height: "calc(33% - 5px)",
                    marginTop: "5px",
                    marginBottom: "5px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  href={`/article/${tp[6].username}/${tp[6].title}/${tp[6]._id}`}
                >
                  <Row
                    className="hoverBox"
                    style={{
                      borderRadius: "20px",
                      height: "100%",
                      width: "100%",
                      marginTop: "5px",
                      marginBottom: "5px",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      md={4}
                      style={{
                        width: "30%",
                        display: "inline",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={tp[6].image}
                        height="100%"
                        width="100%"
                      ></Image>
                    </div>
                    <div style={{ display: "inline", width: "70%" }}>
                      <p
                        style={{
                          color: "purple",
                          paddingBottom: "8px",
                          fontSize: "10px",
                        }}
                      >
                        <b>{tp[6].tags}</b>
                      </p>
                      <h5>{tp[6].title}</h5>
                      <p
                        style={{
                          color: "grey",
                          fontSize: "12px",
                        }}
                      >
                        by {tp[6].username} on {tp[6].date}
                      </p>
                    </div>
                  </Row>
                </a>
              </Link>
            </Row>
          </Col>
        </Row>
        <div id="columns">
          {" "}
          {ap.map((e) => {
            return (
              <div className="nonBreak" style={{ height: "auto" }}>
                <Link href={`/article/${e.username}/${e.title}/${e._id}`}>
                  <a
                    href={`/article/${e.username}/${e.title}/${e._id}`}
                    className="card"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      className="thumb"
                      style={{
                        backgroundImage: `url("${e.image}")`,
                        borderRadius: "20px",
                      }}
                    ></div>
                    <article>
                      <h1>{e.title}</h1>
                      <span>{e.blog}</span>
                    </article>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export async function getStaticProps() {
  const response = await axios.get("https://www.arnavgupta.net/api/homeData");
  const res = response.data;
  return {
    props: { res },
  };
}

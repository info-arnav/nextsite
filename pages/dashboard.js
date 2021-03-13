import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "./api/footer";
import { loadProgressBar } from "axios-progress-bar";
import Navigation from "./api/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form } from "react-bootstrap";
import jwts from "jwt-simple";
import axios from "axios";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
loadProgressBar();
export default function Dashboard() {
  const onError = () => {
    setDisplay("error.png");
  };
  const router = useRouter();
  const handleEditorChange = (content, editor) => {
    setblog(content);
  };
  const [title, settitle] = useState("");
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState("error.png");
  const [blog, setblog] = useState("");
  const [tag, settag] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [status, setStatus] = useState("loggedIn");
  useEffect(() => {
    localStorage.getItem("userData")
      ? jwts.decode(
          localStorage.getItem("userData"),
          "Arnav30080422020731017817087571441"
        ).username
        ? setStatus("loggedIn")
        : router.push("/")
      : router.push("/");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/post", {
        tags: tag,
        image: display,
        username: jwts.decode(
          localStorage.getItem("userData"),
          "Arnav30080422020731017817087571441"
        ).username,
        userdp: jwts.decode(
          localStorage.getItem("userData"),
          "Arnav30080422020731017817087571441"
        ).userdp,
        blog: blog,
        title: title,
      })
      .then((res) => {
        router.push(res.data);
      });
  };
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
              url: "https://www.arnavgupta.net/dashboard",
              sameAs: [
                "https://www.instagram.com/infinity.newtech/",
                "https://www.linkedin.com/in/arnav-gupta-0922341a9/",
                "https://www.facebook.com/infinity.newTechnology",
                "https://twitter.com/infinityNewTech",
              ],
            }),
          }}
        />
        <title>Infinity | Dasboard</title>
        <meta property="og:title" content="Infinity | Dasboard" />
        <meta name="twitter:title" content="Infinity | Dasboard" />
        <meta
          name="description"
          content="Want to share your blogs ? You are at the right place, write whatever you want and publish it here for the world to see your posts."
        />
        <meta
          property="og:description"
          content="Want to share your blogs ? You are at the right place, write whatever you want and publish it here for the world to see your posts."
        />
        <meta
          name="twitter:description"
          content="Want to share your blogs ? You are at the right place, write whatever you want and publish it here for the world to see your posts."
        />
      </Head>
      <Navigation />
      <Form
        onSubmit={onSubmit}
        style={{ width: "90%", marginLeft: "5%", marginBottom: "20px" }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            style={error ? { border: "solid red" } : {}}
            required
            type="text"
            placeholder="Tag"
            value={tag}
            onKeyDown={(e) => {
              console.log(e.key);
              let array = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "Backspace",
              ];
              array.indexOf(e.key) > -1 ? "" : e.preventDefault();
            }}
            onChange={(e) => {
              settag(e.target.value);
              if (tag.indexOf(" ") > -1) {
                setError(true);
              } else {
                setError(false);
              }
            }}
          />
          <Form.Text className="text-muted">
            Write a word that describes your post the best such as nature,
            technology, etc (only alphabets are allowed)
          </Form.Text>
        </Form.Group>
        <div>
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            apiKey={"pj9jgbi5jyqo7yzpy2wllqiw91bjvhm43wc8ug5ttzxg6wug"}
            init={{
              height: 500,

              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
              branding: false,
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <br />
        <Row style={{ alignItems: "center" }}>
          <Col md={8}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Image Url"
                value={imageUrl}
                onChange={async (e) => {
                  setimageUrl(e.target.value);
                  setDisplay(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <img width="100%" src={display} onError={onError}></img>
          </Col>
        </Row>
        <br></br>
        {error ? (
          <Button
            style={{ width: "100%" }}
            disabled
            variant="primary"
            type="submit"
          >
            POST
          </Button>
        ) : (
          <Button style={{ width: "100%" }} variant="primary" type="submit">
            POST
          </Button>
        )}
      </Form>
      <Footer></Footer>
    </div>
  );
}

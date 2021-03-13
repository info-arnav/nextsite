import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import jwts from "jwt-simple";
import { Dropdown, Modal } from "react-bootstrap";

export default function Navigation() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("loggedOut");
  const searchClient = algoliasearch(
    "8PCXEU15SU",
    "7b08d93fde9eb5eebb3d081f764b2ec4"
  );
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="inline"
      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iOTgwLjAwMDAwMHB0IiBoZWlnaHQ9Ijk4OC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDk4MC4wMDAwMDAgOTg4LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE2LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxOQo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw5ODguMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNNDY1MCA5ODYzIGMtMTkgLTEgLTg3IC04IC0xNTAgLTE0IC02MDcgLTU2IC0xMTgzIC0yMjEgLTE3NDUgLTQ5OQotMzA2IC0xNTEgLTU1MCAtMzAyIC04MDYgLTQ5NiAtMTAzNCAtNzg3IC0xNzE1IC0xOTM4IC0xODk4IC0zMjA5IC0zOCAtMjY1Ci00NiAtMzg1IC00NSAtNzEwIDAgLTM1MyAxMyAtNTE2IDY1IC04MjUgMTIyIC03MjQgNDE1IC0xNDI5IDg0MiAtMjAyNyA2NzgKLTk1MiAxNjc2IC0xNjM5IDI3OTIgLTE5MjEgNDUxIC0xMTQgODM2IC0xNTkgMTI5NSAtMTQ5IDI3OCA2IDQzMyAyMCA2OTAgNjMKMTQ5MyAyNDggMjgwMCAxMTg3IDM1MjIgMjUyOSA2MDcgMTEyOSA3NDcgMjQyOSAzOTMgMzY1NCAtMTk1IDY3NyAtNTE3IDEyNzkKLTk3OSAxODM2IC0xMjIgMTQ2IC00NTUgNDgxIC01OTEgNTk0IC04NDAgNjk2IC0xNzkyIDEwODggLTI4NDkgMTE3MSAtMTE4IDkKLTQ1MyAxMSAtNTM2IDN6IG00ODYgLTQ2MyBjODcxIC02OSAxNjY1IC0zNjYgMjM0OSAtODc4IDU1MSAtNDEzIDEwMDggLTk1OQoxMzE2IC0xNTczIDIzMSAtNDYzIDM4MyAtOTc2IDQ0NSAtMTUwNCAyMCAtMTc4IDMxIC01NzIgMjIgLTgwOCAtMTQgLTM4MiAtODUKLTc3MyAtMjAzIC0xMTMyIC0xMjYgLTM4MSAtMzM0IC03OTIgLTU2NSAtMTEyMCAtMTQ1IC0yMDYgLTQwNSAtNTA5IC01NDAKLTYzMSBsLTM3IC0zMyAtMjMgMzEgYy05NCAxMjggLTE1NSAyMTcgLTIwNSAzMDMgLTc0IDEyNiAtMTgxIDIzNSAtMzMwIDMzNAotMzY5IDI0NyAtODQ0IDM3OSAtMTQ3NSA0MTAgLTE0OCA3IC0xODIgMTIgLTIxNyAyOSAtOTUgNDkgLTExMyAxMDggLTExMyAzNzEKbDEgMTk2IDkwIDQ0IGMxNDUgNzAgNDg2IDI5NyA2NjQgNDQxIDE1MCAxMjIgMzA0IDMwNiAzNTQgNDIzIDIzIDUyIDIzIDUyIDkxCjQ1MiAxNDIgODI0IDE4NyAxMjA0IDE3NyAxNDkwIC0xOSA1MzIgLTE0NyA5NTIgLTM5MCAxMjgyIC04NyAxMTcgLTI1MCAyNzEKLTM3NyAzNTYgLTM0OCAyMzEgLTc2NCAzNDAgLTEzMDAgMzQwIC02NTYgMSAtMTE1MCAtMTcxIC0xNTAwIC01MjMgLTMxMSAtMzEyCi00ODEgLTcyNyAtNTMwIC0xMjk1IC0zMCAtMzU0IDExIC03NDcgMTc5IC0xNzEwIDIxIC0xMjEgNDMgLTI1MCA0OSAtMjg4IDI1Ci0xNjMgMTc1IC0zNzIgMzc3IC01MjggMTE4IC05MSAzNzQgLTI1NyA1NjggLTM2OSBsMTk3IC0xMTUgMCAtMTg3IGMwIC0yNjUKLTE4IC0zMjYgLTEwOCAtMzc2IC0zNyAtMjEgLTY1IC0yNSAtMTkwIC0zMyAtNzI2IC00NCAtMTMxNyAtMjM0IC0xNjYzIC01MzYKLTg4IC03NyAtMTM1IC0xMzMgLTIxNSAtMjU2IC0zNyAtNTYgLTk0IC0xNDQgLTEyNyAtMTk0IC0zNCAtNTEgLTY0IC05MyAtNjgKLTkzIC05IDAgLTIyMSAyMjUgLTMxMSAzMzAgLTg2MyAxMDA1IC0xMjI3IDIzMzEgLTEwMDIgMzY0OSAyMTYgMTI2OCAxMDAyCjI0MTIgMjExNyAzMDc5IDc2NSA0NTcgMTY4MiA2ODYgMjQ5MyA2MjJ6IG0xMzQgLTE2ODUgYzM4MCAtNDcgNjU1IC0xNjcgODY2Ci0zNzkgMzQ2IC0zNDUgNDcwIC05MTQgMzcwIC0xNjg2IC0zNSAtMjY1IC0xMDcgLTY5NCAtMTU3IC05MzUgLTIxIC0xMDQgLTM5Ci0yMTMgLTM5IC0yNDEgMCAtNDAgLTcgLTYwIC0zMCAtOTYgLTYxIC05MiAtMjU3IC0yNTggLTMwNSAtMjU4IC0xMSAwIC05OQotNTIgLTE5NCAtMTE1IC05NiAtNjMgLTIyNyAtMTQzIC0yOTAgLTE3NyAtMTAxIC01NSAtMTMyIC03OCAtMjM5IC0xODMgbC0xMjMKLTEyMCA0IC0zMDUgYzUgLTM0MSA4IC0zNjEgNzkgLTUxMCA1NSAtMTE1IDE3NyAtMjM5IDI4OCAtMjkyIDExMSAtNTQgMTc2Ci02NyAzNzMgLTc4IDQ4OSAtMjcgODE4IC0xMDEgMTEyMCAtMjUxIDIwMCAtMTAwIDMwNSAtMTg2IDQxNSAtMzQ0IDgzIC0xMTcKMTg2IC0yNTIgMjI0IC0yOTIgbDMxIC0zMiAtMTU5IC0xMDQgYy03MjggLTQ3NSAtMTQyNiAtNzQwIC0yMTg5IC04MjkgLTE3MgotMjAgLTcwNSAtMTcgLTg4NSA1IC02MzYgNzkgLTEyMTUgMjc5IC0xNzYzIDYwOSAtMTExIDY3IC0zNDkgMjMwIC00NDEgMzAzCi0yNiAyMCAtMTUgNDIgNjEgMTMxIDMyIDM4IDkzIDExNyAxMzUgMTc1IDEyNyAxNzQgMjQxIDI2OSA0NDMgMzY5IDI4OSAxNDEKNjcwIDIyOCAxMTUwIDI2MCAxNzggMTEgMjQxIDI2IDM1NSA4MiAxMjMgNjAgMjIyIDE2MSAyODMgMjg5IDcyIDE0OSA4MCAyMDAKODUgNTI3IGw0IDI4MyAtMTEzIDExNCBjLTEwMCAxMDIgLTEyMyAxMjAgLTIwMyAxNTkgLTUwIDI0IC0xODcgMTA4IC0zMDQgMTg1Ci0xMTcgNzggLTIyMSAxNDEgLTIzMiAxNDEgLTI1IDAgLTE2MiAxMDMgLTIzOSAxODEgLTgxIDgyIC0xMDEgMTIxIC0xMDEgMTk3CjAgMzMgLTExIDExMyAtMjUgMTc4IC05NCA0NTYgLTE4NiAxMDc0IC0yMDAgMTM0NCAtMTMgMjM3IDIzIDU1NyA4NSA3NzEgMzkKMTMwIDEzMiAzMjIgMjAxIDQxNCAyMTggMjg3IDU1MiA0NTEgMTAzNiA1MTAgMTUzIDE4IDQ3MiAxOCA2MjMgMHoiLz4KPC9nPgo8L3N2Zz4K"
      height="40px"
      width="40px"
      style={{
        borderRadius: "50%",
        marginLeft: "5px",
        marginRight: "5px",
      }}
      alt="login profile dropdown icon"
    ></img>
  ));
  const CustomToggleSecond = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      style={{
        marginRight: "10px",
        marginLeft: "10px",
        width: "85px",
        padding: "0.25px",
        paddingLeft: "0",
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn btn-4 btn-4c icon-arrow-right"
      id="data"
      wfd-id="62"
    >
      {typeof window !== "undefined"
        ? window.location.pathname === "/allBlogs"
          ? "Blogs"
          : window.location.pathname === "/about"
          ? "About"
          : "Home"
        : ""}{" "}
      &darr;
    </button>
  ));
  useEffect(() => {
    localStorage.getItem("userData")
      ? jwts.decode(
          localStorage.getItem("userData"),
          "Arnav30080422020731017817087571441"
        ).username
        ? setStatus("loggedIn")
        : setStatus("loggefOut")
      : setStatus("loggefOut");
  }, []);
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="dev_BLOGS">
        <nav>
          <Link href="/" id="image">
            <img
              id="image"
              alt="The logo of the website which showcases a symbol of infinity combined to wires"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNTcwLjAwMDAwMHB0IiBoZWlnaHQ9IjU3MC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDU3MC4wMDAwMDAgNTcwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE2LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxOQo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw1NzAuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNMzA3OCA0MTkxIGMtNDcgLTMwIC0xMTIgLTEwNSAtMTUxIC0xNzMgLTE5IC0zMyAtMjYgLTM3IC00OCAtMzMKLTIyIDUgLTMxIDAgLTQ2IC0yMiAtNDEgLTU4IC02OCAtMTI4IC02OCAtMTc0IDAgLTQzIDEyIC02NCAyMTUgLTM2NSAxMTgKLTE3NSAyNDggLTM3MCAyODkgLTQzMSAxMDEgLTE1MyAxMTYgLTE1NiAxNzQgLTM4IDM3IDc1IDQ1IDEyNiAyOCAxNzAgLTUgMTMKMiA0MyAyMSA4OSA0NCAxMDcgNjAgMTg5IDY1IDMzMSA0IDExMCAyIDE0MiAtMTYgMjEyIC0xMiA0NSAtMjEgODcgLTIxIDk1IDEKMzggMTE5IDc3IDIzNSA3NyAxMzQgMSAzMjAgLTcwIDQ0MyAtMTcwIDY4IC01NSAxNjcgLTE4MCAyMTIgLTI2OSAyMjggLTQ1MgoxODggLTExOTkgLTg1IC0xNjEwIC0xMzQgLTIwMSAtMzI1IC0zMDkgLTUwMSAtMjgxIC04OSAxNCAtMTI4IDM1IC0yMTYgMTE5Ci0xOTEgMTgzIC0zODIgNTU2IC01OTggMTE2NyAtMTk4IDU2MCAtNTAxIDk5MyAtODAyIDExNDUgLTEwMSA1MCAtMTY5IDY0Ci0yODggNTcgLTM5MCAtMjMgLTcxNiAtMzgxIC04MzAgLTkxMiAtMzEgLTE0MiAtMzggLTQ0OCAtMTYgLTY0MSA0MyAtMzczIDE3NQotNjkzIDM1OSAtODc1IDE0NSAtMTQzIDM0OCAtMjA5IDUwMiAtMTY0IDc1IDIxIDE2NyA2OCAyNzQgMTM5IDQ3IDMxIDg4IDU2CjkzIDU2IDUgMCAyMSAtMTIgMzYgLTI2IDE0MyAtMTM1IDMyMCAtNTcgNDg5IDIxNiA3MyAxMTkgOTYgMTc3IDkxIDIzNSAtMyAzMgotMTMgNjIgLTI3IDgyIGwtMjMgMzAgMjcgNTIgYzM1IDcwIDg1IDIyNSA4NSAyNjQgMCAzNyAtMTggNzYgLTQxIDkwIC0yNiAxNgotNzMgLTI0IC0xMzEgLTExMSAtMjggLTQzIC01NCAtODEgLTU5IC04NiAtNCAtNSAtNDIgNDQgLTg0IDEwOSBsLTc3IDExNyAzMAo2NyBjOTAgMTk1IDEwMSAzNDEgMjcgMzQxIC0zMCAwIC02MyAtMzQgLTEyNyAtMTMwIC0yNyAtNDEgLTUxIC03NyAtNTMgLTc5Ci0yIC0yIC0xNCAxMyAtMjUgMzIgLTI0IDQxIC01NiA1NiAtNzYgMzYgLTIwIC0yMiAtOTkgLTE4NiAtMTMyIC0yNzkgLTU4Ci0xNTggLTczIC0yNDIgLTc5IC00MjAgLTUgLTE0NyAtMyAtMTc2IDE2IC0yNDkgMTEgLTQ2IDMyIC0xMDggNDYgLTEzOCAxNAotMzAgMjIgLTU5IDE5IC02NSAtMTAgLTE2IC0xMzggLTk1IC0yMTUgLTEzMiAtMTExIC01NCAtMTU3IC02MSAtMjYyIC00MgotMjA3IDM5IC0zODkgMjE1IC00OTUgNDc4IC01MSAxMjYgLTYwIDE1MyAtODEgMjM5IC02MCAyNTQgLTczIDU1MCAtMzMgNzY5CjI1IDEzOCA4NyAzMjYgMTM3IDQxOCAxMzcgMjUwIDM2OSA0NTIgNTIwIDQ1MiAxOCAwIDU2IDUgODQgMTIgMzggOCA3MCA4IDEzMwowIDIxMSAtMjkgNDEzIC0xOTMgNjE1IC01MDAgMTM5IC0yMTAgMjM0IC00MTAgMzQwIC03MTcgMjM0IC02NzYgNTAwIC0xMTI5CjczMCAtMTI0MSA1NCAtMjcgNjcgLTI5IDE3MyAtMjkgMTA1IDAgMTIwIDMgMTgwIDI5IDI2OCAxMjAgNDU2IDQzOCA1NDIgOTE2CjE4IDEwMiAxOCA1NzcgMCA2ODAgLTM3IDIwNyAtMTAyIDM5OCAtMTg0IDUzNCAtNTQgODkgLTIwNCAyNDIgLTI4MyAyODggLTE2Ngo5NSAtMzUwIDEzMSAtNDg3IDk0IC03OSAtMjIgLTE0NyAtNDcgLTE1NCAtNTcgLTExIC0xOCAtMjMgLTggLTYwIDUyIC00NiA3NgotMTMyIDE2NCAtMTgwIDE4NCAtNTkgMjUgLTEyMyAxOSAtMTc2IC0xNHogbTE1NyAtMTAwIGM4NyAtMzkgMjEzIC0yMjkgMjQ2Ci0zNzEgMTYgLTY5IDE2IC0yMTcgLTEgLTI5NSAtMTUgLTc0IC01OSAtMTk1IC03MSAtMTk1IC0xNiAwIC00NDkgNjQzIC00NDkKNjY3IDAgMTkgNTIgMTA2IDg5IDE0NyAyOCAzMSA5NCA2NiAxMjYgNjYgMTEgMCAzOCAtOSA2MCAtMTl6IG0tMjM0IC00MjMKYzQyMyAtNjI4IDQwMyAtNTk3IDM5MyAtNjI2IC01IC0xNSAtMTUgLTI3IC0yMiAtMjcgLTEyIDAgLTEyNCAxNjEgLTQwOCA1ODQKLTY0IDk2IC0xMTkgMTgyIC0xMjEgMTkyIC01IDE5IDEzIDU5IDI3IDU5IDUgMCA2NCAtODIgMTMxIC0xODJ6IG0tNTI1IC05ODgKYzMyIC01MiA2MyAtMTAwIDY5IC0xMDYgNSAtNyAyNiAtMzggNDYgLTcwIDIwIC0zMyA4NiAtMTM3IDE0NyAtMjMxIGwxMTEKLTE3MyAtMjAgLTQ2IGMtMTEgLTI1IC0yNCAtNDQgLTI5IC00MiAtOCAzIC05OSAxNDEgLTI2OCA0MDYgLTI2IDQwIC04MCAxMjMKLTEyMCAxODQgLTc5IDEyMSAtNzkgMTE5IC0zNSAxODYgMTcgMjggNyAzOSA5OSAtMTA4eiBtLTgzIC0yMDMgYzQ1IC02OSA5OAotMTUyIDExOCAtMTg0IDIwIC0zMiA4MyAtMTI5IDEzOCAtMjE2IGwxMDIgLTE1OCAtNDcgLTU5IGMtMTI3IC0xNjIgLTI0OAotMTkwIC0zNDggLTc5IC0xMzAgMTQ1IC0xNzUgMzU4IC0xMjYgNjAyIDI1IDEyMSA2NCAyMzYgNzYgMjI0IDMgLTMgNDIgLTYxCjg3IC0xMzB6Ii8+CjwvZz4KPC9zdmc+Cg=="
              width="60px"
              height="60px"
              style={{
                borderRadius: "50%",
                marginLeft: "5px",
                marginRight: "5px",
              }}
              className="d-inline-block align-top"
            />
          </Link>
          <div>
            <Dropdown id="navToggle">
              <Dropdown.Toggle as={CustomToggleSecond}></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item key="home">
                  <Link href="/">Home</Link>
                </Dropdown.Item>
                {status == "loggedIn" ? (
                  <Dropdown.Item key="blogs">
                    <Link href="/allBlogs">Blogs</Link>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item key="about">
                    <Link href="/about">About</Link>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>{" "}
            </Dropdown>
          </div>
          <div id="inDropdown">
            {" "}
            <Link
              href="/"
              style={{
                display: "inherit",
                marginRight: "10px",
              }}
            >
              <button
                className="btn btn-4 btn-4c icon-arrow-right"
                style={{ marginRight: "5px" }}
                id={
                  typeof window !== "undefined"
                    ? window.location.pathname === "/"
                      ? "active"
                      : "data"
                    : "data"
                }
                wfd-id="62"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </button>
            </Link>
            {status != "loggedIn" ? (
              <Link
                href="/about"
                style={{
                  display: "inherit",
                  marginRight: "10px",
                }}
              >
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ marginRight: "5px" }}
                  id={
                    typeof window !== "undefined"
                      ? window.location.pathname === "/about"
                        ? "active"
                        : "data"
                      : "data"
                  }
                  wfd-id="62"
                  onClick={() => {
                    router.push("/about");
                  }}
                >
                  About
                </button>
              </Link>
            ) : (
              <Link
                href="/allBlogs"
                style={{
                  display: "inherit",
                  marginRight: "10px",
                }}
              >
                <button
                  className="btn btn-4 btn-4c icon-arrow-right"
                  style={{ marginRight: "5px" }}
                  id={
                    typeof window !== "undefined"
                      ? window.location.pathname === "/allBlogs"
                        ? "active"
                        : "data"
                      : "data"
                  }
                  wfd-id="62"
                  onClick={() => {
                    router.push("/allBlogs");
                  }}
                >
                  Blogs
                </button>
              </Link>
            )}
          </div>
          <SearchBox
            style={{ width: "100%" }}
            translations={{ placeholder: "Search" }}
          />
          {status !== "loggedIn" ? (
            <div style={{ display: "inherit" }}>
              {" "}
              <button
                style={{
                  padding: "0",
                  marginLeft: "2px",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                onClick={() => setShow(true)}
              >
                <img
                  className="inline"
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjIwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDIwMC4wMDAwMDAgMjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE2LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxOQo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwyMDAuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNODA1IDE5MjYgYy0zMTIgLTcyIC01NjEgLTI4MCAtNjc4IC01NjYgLTU2IC0xMzcgLTYyIC0xNzMgLTYyIC0zNjAKMCAtMTg3IDYgLTIyMyA2MiAtMzYwIDYzIC0xNTQgMTg3IC0zMTIgMzE5IC00MDYgNzcgLTU1IDIyNyAtMTI2IDMxOSAtMTUwCjEwMCAtMjcgMzcwIC0yNyA0NzAgMCA4MyAyMiAyMzQgOTAgMzAyIDEzNyAxNjcgMTE0IDI5NyAyOTQgMzY5IDUwOSAyNyA4MCAyOAo5NSAyOSAyNjUgMCAyMDYgLTggMjQ2IC04MSA0MDQgLTU0IDExNiAtMTEyIDE5NyAtMjAwIDI4MiAtODUgODAgLTE0MCAxMTgKLTI0NiAxNjkgLTE0MiA2OSAtMjAyIDgyIC0zODMgODYgLTExMiAyIC0xNzggLTEgLTIyMCAtMTB6IG0zOTUgLTk2IGMyNTEgLTYxCjQ3MiAtMjQ1IDU4MSAtNDg2IDg2IC0xOTAgOTMgLTQ0MCAxOCAtNjQ0IC04MiAtMjIxIC0yNzggLTQxNyAtNDk5IC00OTkgLTE1MgotNTYgLTM0NCAtNjggLTUwMCAtMzEgLTMwNyA3NCAtNTU2IDMyNCAtNjMwIDYzMyAtMjcgMTEzIC0yNyAyODIgMCAzOTcgNzMKMzA0IDMyMyA1NTUgNjI4IDYzMCAxMDkgMjcgMjg5IDI2IDQwMiAweiIvPgo8cGF0aCBkPSJNMTMyMCAxMzc1IGwwIC03NSAtNzUgMCAtNzUgMCAwIC0zNSAwIC0zNSA3NSAwIDc1IDAgMCAtODAgMCAtODAgMzUKMCAzNSAwIDAgODAgMCA4MCA3NSAwIDc1IDAgMCAzNSAwIDM1IC03NSAwIC03NSAwIDAgNzUgMCA3NSAtMzUgMCAtMzUgMCAwCi03NXoiLz4KPHBhdGggZD0iTTgyMiAxMzczIGMtMTU3IC03NyAtOTAgLTM3MyA4NSAtMzczIDEzNyAwIDIyMCAyMDcgMTMzIDMzMSAtNDAgNTYKLTE0OCA3NyAtMjE4IDQyeiIvPgo8cGF0aCBkPSJNNzY0IDkwNiBjLTY3IC0xNiAtMTEwIC00MiAtMTQ4IC04OSAtMjggLTM1IC0zMSAtNDYgLTMxIC0xMDUgbDAKLTY3IDc1IC0zOCBjNDEgLTIwIDk5IC00MiAxMjkgLTQ3IDEyOCAtMjQgMjcwIC00IDM3NiA1MyBsNjAgMzIgMyA1MiBjNSA3OQotMzcgMTQ4IC0xMTMgMTg2IC03NCAzNyAtMjQ3IDQ4IC0zNTEgMjN6Ii8+CjwvZz4KPC9zdmc+Cg=="
                  height="40px"
                  width="40px"
                  style={{
                    borderRadius: "50%",
                    marginLeft: "2px",
                  }}
                  alt="signup button represented with an icon"
                />
              </button>
              <button
                style={{
                  padding: "0",
                  border: "none",
                  marginLeft: "2px",
                  marginRight: "10px",
                  backgroundColor: "transparent",
                }}
              >
                <img
                  className="inline"
                  onClick={() => {
                    setShow(true);
                  }}
                  src="data:image/png;base64,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"
                  height="40px"
                  width="40px"
                  style={{
                    borderRadius: "50%",
                    marginLeft: "2px",
                  }}
                  alt="login button represented with an icon"
                ></img>
              </button>
            </div>
          ) : (
            <div>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="profile">
                    <Link href="/active">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="bookmarks">
                    <Link href="/bookmarked">Bookmarks</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="new post">
                    <Link href="/dashboard">New Post</Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout">
                    <a
                      onClick={() => {
                        localStorage.removeItem("userData");
                        typeof window !== "undefined"
                          ? window.location.reload()
                          : "";
                      }}
                    >
                      Logout
                    </a>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </nav>
        <main>
          <Modal
            onHide={() => setShow(false)}
            size="lg"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body></Modal.Body>
          </Modal>
        </main>
      </InstantSearch>
    </div>
  );
}

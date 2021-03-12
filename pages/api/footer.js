import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <footer className="footer-bs" style={{ marginBottom: "0px" }}>
        <div className="row">
          <div className="col-md-3 footer-brand animated fadeInLeft">
            <h2 style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ display: "inline" }}
                width="20%"
                alt="logo"
                src="/favicon.ico"
              ></img>{" "}
            </h2>
            <p>
              <h2>Infinity</h2>
              Infinity offers an opportunity to every blogger out there to
              display their thoughts in front of everyone. ‘Better to write for
              yourself and have no public, than to write for the public and have
              no self’. Passionate bloggers is a website where you can write
              your thoughts and let people live in a thousand worlds before they
              die.
            </p>
            <p>© 2020 Infinity, All rights reserved</p>
          </div>
          <div className="col-md-4 footer-nav animated fadeInUp">
            <h4>Categories —</h4>
            <div className="col-md-6">
              <ul className="list">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="#">Register</Link>
                </li>
                <li>
                  <Link href="/">Posts</Link>
                </li>
                <li>
                  <Link href="/privacyPolicy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 footer-social animated fadeInDown">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a href="https://www.facebook.com/infinity.newTechnology">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/infinityNewTech">Twitter</a>
              </li>
              <li>
                <a href="https://www.instagram.com/infinity.newtech/">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/arnav-gupta-0922341a9/">
                  Linkedin
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-3 footer-ns animated fadeInRight">
            <h4>Contact Us</h4>
            <p>Have queries ? Contact Us Here .</p>
            <br></br>
            <p>
              <div className="input-group">
                <form action="/api/contact" method="POST">
                  <input
                    type="email"
                    className="form-control"
                    required
                    placeholder="Email Id"
                    name="email"
                  />
                  <br></br>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Message"
                    name="message"
                  />
                  <br></br>
                  <Button type="submit">Send Message</Button>
                </form>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-envelope"></span>
                  </button>
                </span>
              </div>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import "./HomeStyle.css";
import { createElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assest/04B_30__.TTF";
import "animate.css";

const HomePage = () => {
  
  return (
    <div class="Home">
      <div class="container">
        <div class="Wel">
          <h1>XO</h1>
          <h1>GAME</h1>
          <p>Created by HuyDinh</p>

          <Link to="/Mode" class="page-play op">
            play
          </Link>
          <a href="#tutorial" class="tutorial op">
            tutorial
          </a>
          <a href="#social" class="social op">
            social
          </a>
        </div>

        <div id="tutorial">
          <h1 style={{ fontFamily: "buble-pixel", color: "#c77dff" }}>
            tutorial
          </h1>
          <video class="video-tutorial" autoPlay loop muted>
            <source src={require("../assest/intro.mp4")}></source>
          </video>
          <h3 style={{ fontFamily: "buble-pixel", color: "#c77dff" }}>!!!</h3>
          <p class="tip">
            Required size selection. If not selected, the Play button will not
            appear. You must choose size and color then enter the room code.
            Enter the room code provided by the room owner then then join.If
            less than one minute, enter a value starting from 0.9 or less
          </p>
        </div>

        <div class="footer">
          <div class="button">
            <a
              href="https://www.instagram.com/huy_jh?igsh=MXZxOWY1MjAxOWJwZg%3D%3D&utm_source=qr"
              class="link-social"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100035017985628&mibextid=2JQ9oc"
              class="link-social"
            >
              <i class="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

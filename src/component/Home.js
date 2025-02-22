import "./HomeStyle.css";
import { createElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assest/04B_30__.TTF";
import "animate.css";
import Tippy from "@tippyjs/react/headless";

const HomePage = () => {
  const logo = require("../assest/game.png");
  const logo2 = require("../assest/game (1).png");
  const vs = require("../assest/versus.png");
  const navigate = useNavigate();
  const [mode_bot, setMode_bot] = useState(false);
  const [mode_human, setMode_huamn] = useState(false);
  const [mode_chal, setMode_chal] = useState(false);

  // useEffect(()=>{
  //   if (document.querySelector('.line') && document.querySelector('.tab_navbar')){
  //     const tabActive=document.querySelector('.tab_navbar.active_tab')
  //     const line=document.querySelector('.line')
  //     line.style.left=tabActive.offsetLeft +'px'
  //     line.style.width=tabActive.offsetWidth + 'px'
  //   }
  // },[])

  const selectDifficulty = (difficulty) => {
    navigate(`/Game`, { state: { difficulty } });
  };

  const selectTime = (size) => {
    const time = document.querySelector(".input_timeout").value;
    navigate(`/Challenge`, { state: { time, size } });
  };

  const selectSize = (size) => {
    navigate(`/Human`, { state: { size } });
  };
  function display_bot() {
    setMode_bot(!mode_bot);
  }
  function display_human() {
    setMode_huamn(!mode_human);
  }

  function display_chal() {
    setMode_chal(!mode_chal);
  }

  return (
    <div class="Home">
      <div class="login">
        <div class="login-container">
          {/* <h1 class='login-heading'>ID</h1>
          <h1 class='login-heading'>CARD</h1> */}
          <form class="login-form">
            <img class="login-avatar"></img>
            <input
              class="login-input"
              placeholder="enter your username"
            ></input>
            <input class="login-input" placeholder="enter your email"></input>
            <input class="login-input" placeholder="enter your old"></input>
            <Tippy
            placement="bottom-start"
            visible
              render={(attrs) => (
                <div
                  class='input-level'
                  tabIndex="-1"
                  {...attrs}
                >
                 <h1>hello</h1>
                </div>
              )}
            >
              <input class="login-input" placeholder="enter your level"></input>
            </Tippy>
            <button class="login-btn">enter</button>
          </form>
        </div>
      </div>
      <div class="header">
        <img className="logo" src={logo2}></img>

        <div class="navbar">
          <button class="tab_navbar active_tab">home</button>
          <button class="tab_navbar " onClick={() => navigate(`/About`)}>
            about me
          </button>
          <button class="tab_navbar">report</button>
        </div>
        <div class="user">
          <p class="user-name-short">H</p>
        </div>
      </div>
      <div class="container">
        <div class="Wel">
          <h1>XO</h1>
          <h1>GAME</h1>
          <p>Created by HuyDinh</p>

          <a href="/Mode" class="page-play op">
            play
          </a>
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

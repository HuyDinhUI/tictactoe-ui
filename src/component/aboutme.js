import "./AboutStyle.css";
import { createElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const logo = require("../assest/game (1).png");

  // useEffect(()=>{
  //     if (document.querySelector('.line')){
  //       const tabActive=document.querySelector('.tab_navbar.active_tab')
  //       const line=document.querySelector('.line')
  //       line.style.left=tabActive.offsetLeft +'px'
  //       line.style.width=tabActive.offsetWidth + 'px'
  //     }
  //   })

  return (
    <div class="Aboutme">
      <div class="info">
        <div class="info_intro">
          <div class="info_intro--img">
            <div class="text">H</div>
            <img
              class="img_1"
              src={require("../assest/huydinh_1.jpg")}
              alt=""
            ></img>
            <img
              class="img_1"
              src={require("../assest/huydinh_2.jpg")}
              alt=""
            ></img>
            <img
              class="img_1"
              src={require("../assest/huydinh_3.jpg")}
              alt=""
            ></img>
            <div class="text">D</div>
          </div>
        </div>
      </div>
      <div class="info_general">
        <div class="info_general--img">
          <img
            class="img_1"
            src={require("../assest/huydinh_1.jpg")}
            alt=""
          ></img>
        </div>
        <div class="info_general--detail">
          <div class="heading">General</div>
          <div class="detail">
            My name is Huy, born in 2004, currently I am a first year student at
            the university of Idustry and Trade. I am studying at the Faculty of
            Information Technology, majoring in Information Security. Even
            though I'm pursuing technology, I'm very passionate about art,
            especially graphic design.
          </div>
        </div>
      </div>
      <div class="info_skill">
        <div class="skill_detail">
          <div class="heading">Skill</div>
          <div class="detail">
            I have both a passion for technology and a passion for art, so I
            regularly update current trends to design accordingly, helping the
            design to be both aesthetic and up to date with trends.
          </div>
        </div>
        <div class="skill-img">
          <img
            class="img_2"
            src={require("../assest/huydinh_2.jpg")}
            alt=""
          ></img>
        </div>
      </div>
      <div class="info_social">
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
  );
};

export default About;

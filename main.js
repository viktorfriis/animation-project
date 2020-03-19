"use strict";
import {
    gsap
} from "gsap";

document.addEventListener("DOMContentLoaded", start);
const el = document.querySelector("section");

function start() {
    console.log("start");

    fetch('imgs/b_bike.svg')
        .then(r => r.text())
        .then(text => {
            el.innerHTML = text;
            SVGInteractive();
        })
        .catch(console.error.bind(console));

    fetch('imgs/b_phone.svg')
        .then(r => r.text())
        .then(text => {
            el.innerHTML += text;
            SVGInteractive();
        })
        .catch(console.error.bind(console));
}

function SVGInteractive() {
    const wheelDuration = 1;
    const repeats = 100;

    const rightWheel = document.querySelector("#right_x5F_wheel");
    const leftWheel = document.querySelector("#left_x5F_wheel");
    const frontLeg = document.querySelector("#front_x5F_leg");
    const backLeg = document.querySelector("#back_x5F_leg");

    const pushMessage = document.querySelector("#push_x5F_message");

    gsap.to(leftWheel, {
        rotate: 360,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none",
        transformBox: "content-box",
        transformOrigin: "center"
    })

    gsap.to(rightWheel, {
        rotate: 360,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none",
        transformBox: "content-box",
        transformOrigin: "center"
    })

    gsap.to(pushMessage, {
        y: 0,
        duration: 0.3,
        delay: 2
    })

    gsap.to(frontLeg, {
        rotate: 5,
        yoyo: true,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none"
    })

    gsap.to(backLeg, {
        rotate: -5,
        yoyo: true,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none"
    })
}
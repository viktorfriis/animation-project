"use strict";
import {
    gsap
} from "gsap";

document.addEventListener("DOMContentLoaded", start);
const el = document.querySelector("section");

function start() {
    console.log("start");

    fetch('imgs/bike_bike.svg')
        .then(r => r.text())
        .then(text => {
            el.innerHTML = text;
            SVGInteractive();
        })
        .catch(console.error.bind(console));

    fetch('imgs/bike_phone.svg')
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
    const frontPedal = document.querySelector("#front_x5F_pedal");
    const backPedal = document.querySelector("#back_x5F_pedal");

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

    gsap.to(frontPedal, {
        rotate: 360,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none",
        transformBox: "content-box",
        transformOrigin: "top"
    })

    gsap.to(backPedal, {
        rotate: 360,
        repeat: repeats,
        duration: wheelDuration,
        ease: "none",
        transformBox: "content-box",
        transformOrigin: "bottom"
    })

    gsap.to(pushMessage, {
        y: 0,
        duration: 0.3,
        delay: 5
    })
}
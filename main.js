"use strict";

import gsap from "gsap";

let myJSON = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
    fetchSVGS();
}

function fetchSVGS() {
    fetch('imgs/landing.svg')
        .then(r => r.text())
        .then(mySVG => {
            document.querySelector("#landing").innerHTML = mySVG;
            SVGInteractive();
        })

    fetch('json/info.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            console.log(data);
            myJSON = data;
        })
}

function SVGInteractive() {
    console.log("klar");
    let symbolCount = 5;

    document.querySelectorAll("#symbols > g > g+g+g").forEach(symbol => {
        symbol.classList.add("symbol");
        symbol.dataset.number = symbolCount;
        symbolCount--;
    })

    document.querySelectorAll(".symbol").forEach(symbol => {
        symbol.addEventListener("click", zoomSymbol);
    })

    const symbols = document.querySelectorAll(".symbol");

    gsap.to(symbols, {
        scale: 1.05,
        duration: 1,
        yoyo: true,
        repeat: 10,
        transformOrigin: "center"
    })
}

function zoomSymbol() {
    console.log("zoom");
    const i = Number(this.dataset.number);
    const svg = document.querySelector("svg");
    console.log(i);

    const symbolBox = this.getBBox();
    console.log(symbolBox);

    const clickedSymbol = myJSON[i];

    document.querySelector("#infoscreen h1").textContent = clickedSymbol.title;

    const timeline = gsap.timeline();
    const timelineLine = gsap.timeline();

    timelineLine.to(`#circle_x5F_${i}_x5F_start`, {
        strokeDashoffset: 0,
        duration: 1
    })

    timelineLine.to(`#path_x5F_${i}`, {
        strokeDashoffset: 0,
        duration: 2
    })

    timelineLine.to(`#circle_x5F_${i}_x5F_end`, {
        strokeDashoffset: 0,
        duration: 1
    })

    timeline.to(svg, {
        attr: {
            viewBox: `${symbolBox.x - 40} ${symbolBox.y - 60} 175 233.75`
        },
        duration: 2,
        delay: 1
    })

    timeline.to("#infoscreen", {
        maxHeight: "80vh",
        border: "10px solid #00FF00",
        padding: "50px",
        duration: 1,
        delay: 1
    })

    timeline.to(".infotext", {
        opacity: "1",
        duration: 0.3
    })


    document.querySelector("#close").addEventListener("click", () => {
        closePopup(i, clickedSymbol);
    });
}

function closePopup(i, clickedSymbol) {
    const svg = document.querySelector("svg");

    const timeline = gsap.timeline();
    const timelineLine = gsap.timeline();

    timeline.to(".infotext", {
        opacity: "0",
        duration: 0.3
    })

    timeline.to("#infoscreen", {
        maxHeight: "0",
        border: "0px solid #00FF00",
        padding: "0",
        duration: 1
    })

    timeline.to(svg, {
        attr: {
            viewBox: `0 0 700 935`
        },
        duration: 2,
    })


    timelineLine.to(`#circle_x5F_${i}_x5F_end`, {
        strokeDashoffset: 19,
        duration: 1,
        delay: 1
    })

    timelineLine.to(`#path_x5F_${i}`, {
        strokeDashoffset: clickedSymbol.dash,
        duration: 2
    })

    timelineLine.to(`#circle_x5F_${i}_x5F_start`, {
        strokeDashoffset: 19,
        duration: 1
    })
}
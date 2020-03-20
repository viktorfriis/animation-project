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
    const i = Number(this.dataset.number);
    const svg = document.querySelector("svg");
    console.log(this.getBoundingClientRect());


    const symbolBox = this.getBBox();
    const clickedSymbol = myJSON[i];

    svg.style.transform = "scale(5)";
    svg.style.transformOrigin = `${clickedSymbol.x}px ${clickedSymbol.y}px`;
}
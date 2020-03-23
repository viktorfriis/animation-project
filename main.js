"use strict";

import gsap from "gsap";

let myJSON = [];

document.addEventListener("DOMContentLoaded", start);

function start() {
    fetchData();
}

function fetchData() {
    fetch("svgs/landing.svg")
        .then(r => r.text())
        .then(mySVG => {
            document.querySelector("#landing").innerHTML = mySVG;
            SVGInteractive();
        });

    fetch("json/info.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            myJSON = data;
        });
}

function SVGInteractive() {
    console.log("klar");
    let symbolCount = 5;

    document.querySelectorAll("#symbols > g > g+g+g").forEach(symbol => {
        symbol.classList.add("symbol");
        symbol.dataset.number = symbolCount;
        symbolCount--;
    });

    document.querySelectorAll(".symbol").forEach(symbol => {
        symbol.addEventListener("click", zoomSymbol);
    });

    const symbols = document.querySelectorAll(".symbol");

    gsap.to(symbols, {
        scale: 1.05,
        duration: 1,
        yoyo: true,
        repeat: 10,
        transformOrigin: "center"
    });
}

function zoomSymbol() {
    const i = Number(this.dataset.number);
    const svg = document.querySelector("svg");
    console.log(i);

    const symbolBox = this.getBBox();
    console.log(symbolBox);

    const clickedSymbol = myJSON[i];

    //Info i infoboksen bliver opdateret, afhængig af hvilket symbol der er klikket på
    document.querySelector("#infoscreen h1").textContent = clickedSymbol.title;

    document.querySelector("#par1").textContent = clickedSymbol.par1;
    document.querySelector("#par2").textContent = clickedSymbol.par2;
    document.querySelector("#par3").textContent = clickedSymbol.par3;
    document.querySelector("#par4").textContent = clickedSymbol.par4;
    document.querySelector("#par5").textContent = clickedSymbol.par5;
    document.querySelector("#par6").textContent = clickedSymbol.par6;

    document.querySelector("#img1").src = `images/${clickedSymbol.billede_1}`;
    document.querySelector("#figcaption1").textContent = clickedSymbol.billede_1_billedtekst;
    document.querySelector("#img2").src = `images/${clickedSymbol.billede_2}`;
    document.querySelector("#figcaption2").textContent = clickedSymbol.billede_2_billedtekst;

    const timeline = gsap.timeline();
    const timelineLine = gsap.timeline();

    //Starter med at animere "ledningen" i en timeline
    timelineLine.to(`#circle_x5F_${i}_x5F_start`, {
        strokeDashoffset: 0,
        duration: 1
    });

    timelineLine.to(`#path_x5F_${i}`, {
        strokeDashoffset: 0,
        duration: 2
    });

    timelineLine.to(`#circle_x5F_${i}_x5F_end`, {
        strokeDashoffset: 0,
        duration: 1
    });

    //Så bliver der zoomet ind på det valgte symbol, ved at sætte koordinatet i viewboxen samt gøre viewboxen 4 gange mindre
    timeline.to(svg, {
        attr: {
            viewBox: `${symbolBox.x - 40} ${symbolBox.y - 60} 175 233.75`
        },
        duration: 2,
        delay: 1
    });

    //Når der er blevet zoomet ind, åbner infoskærmen
    timeline.to("#infoscreen", {
        maxHeight: "80vh",
        border: "10px solid #00FF00",
        padding: "50px",
        duration: 1
    });

    //Når infoskærmen er åbnet, bliver teksten synlig
    timeline.to(".infotext", {
        opacity: "1",
        duration: 0.3
    });

    //Luk knap gøres klikbar
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
    });

    timeline.to("#infoscreen", {
        maxHeight: "0",
        border: "0px solid #00FF00",
        padding: "0",
        duration: 1
    });

    timeline.to(svg, {
        attr: {
            viewBox: `0 0 700 935`
        },
        duration: 2
    });

    timelineLine.to(`#circle_x5F_${i}_x5F_end`, {
        strokeDashoffset: 19,
        duration: 1,
        delay: 1
    });

    timelineLine.to(`#path_x5F_${i}`, {
        strokeDashoffset: clickedSymbol.dash,
        duration: 2
    });

    timelineLine.to(`#circle_x5F_${i}_x5F_start`, {
        strokeDashoffset: 19,
        duration: 1
    });
}
"use strict";

import gsap from "gsap";

let myJSON = [];
const cnt = document.querySelector("#infoscreen");
let ratio;

let mute = false;

document.addEventListener("DOMContentLoaded", start);

function start() {
    fetchData();

    ratio = 0;
    document.querySelector("#scroll_bar").style.height = ratio * 100 + "%";
    cnt.addEventListener("scroll", calcRatio);
    document.querySelector("#muteBtn").addEventListener("click", toggleMute);
}

function calcRatio() {
    ratio = cnt.scrollTop / (cnt.scrollHeight - cnt.clientHeight);
    document.querySelector("#scroll_bar").style.height = ratio * 100 + "%";
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
        repeat: 100,
        transformOrigin: "center"
    });
}

function zoomSymbol() {
    const i = Number(this.dataset.number);
    const svg = document.querySelector("svg");
    console.log(i);

    playStartupSound();

    const symbolBox = this.getBBox();
    console.log(symbolBox);

    const clickedSymbol = myJSON[i];

    //Info i infoboksen bliver opdateret, afhængig af hvilket symbol der er klikket på
    document.querySelector("#infoscreen h1").textContent = clickedSymbol.title;

    document.querySelector("#par1").textContent = clickedSymbol.par1;
    document.querySelector("#h2_1").textContent = clickedSymbol.h2_1;

    document.querySelector("#par2").textContent = clickedSymbol.par2;
    document.querySelector("#h2_2").textContent = clickedSymbol.h2_2;

    document.querySelector("#par3").textContent = clickedSymbol.par3;
    document.querySelector("#h2_3").textContent = clickedSymbol.h2_3;

    document.querySelector("#par4").textContent = clickedSymbol.par4;
    document.querySelector("#h2_4").textContent = clickedSymbol.h2_4;

    document.querySelector("#par5").textContent = clickedSymbol.par5;
    document.querySelector("#h2_5").textContent = clickedSymbol.h2_5;

    document.querySelector("#par6").textContent = clickedSymbol.par6;
    document.querySelector("#h2_6").textContent = clickedSymbol.h2_6;

    document.querySelector("#img1").src = `images/${clickedSymbol.billede_1}`;
    document.querySelector("#figcaption1").textContent = clickedSymbol.billede_1_billedtekst;
    document.querySelector("#img2").src = `images/${clickedSymbol.billede_2}`;
    document.querySelector("#figcaption2").textContent = clickedSymbol.billede_2_billedtekst;
    document.querySelector("#img3").src = `images/${clickedSymbol.billede_3}`;
    document.querySelector("#figcaption3").textContent = clickedSymbol.billede_3_billedtekst;
    document.querySelector("#img4").src = `images/${clickedSymbol.billede_4}`;
    document.querySelector("#figcaption4").textContent = clickedSymbol.billede_4_billedtekst;

    if (clickedSymbol.billede_3 === undefined) {
        document.querySelector("#fig3").style.display = "none";
        document.querySelector("#fig4").style.display = "none";
    } else {
        document.querySelector("#fig3").style.display = "block";
        document.querySelector("#fig4").style.display = "block";
    }

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

    gsap.to("#header", {
        opacity: 0,
        duration: 0.3,
        delay: 0.8
    })

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
        border: "10px solid #578cbd",
        padding: "50px",
        duration: 1
    });

    //Når infoskærmen er åbnet, bliver teksten synlig
    timeline.to(".infotext", {
        opacity: "1",
        duration: 0.3
    });

    gsap.to("#scroll_container", {
        maxHeight: "80vh",
        duration: 1,
        delay: 3
    })

    //Luk knap gøres klikbar
    document.querySelector("#close").addEventListener("click", () => {
        closePopup(i, clickedSymbol);
    });
}

function closePopup(i, clickedSymbol) {
    const svg = document.querySelector("svg");

    playShutdownSound();

    const timeline = gsap.timeline();
    const timelineLine = gsap.timeline();

    timeline.to(".infotext", {
        opacity: "0",
        duration: 0.3
    });

    gsap.to("#scroll_container", {
        maxHeight: "0",
        duration: 1,
        delay: 0.3
    })

    timeline.to("#infoscreen", {
        maxHeight: "0",
        border: "0px solid #578cbd",
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

    timelineLine.to("#header", {
        opacity: 1,
        duration: 0.3
    })

    timelineLine.to(`#circle_x5F_${i}_x5F_start`, {
        strokeDashoffset: 19,
        duration: 1
    });

}

function playStartupSound() {
    if (mute === false) {
        document.querySelector("#startup").play();
    }
}

function playShutdownSound() {
    if (mute === false) {
        document.querySelector("#shutdown").play();
    }
}

function toggleMute() {
    if (mute === false) {
        mute = true;
        document.querySelector("#muteBtn > img").src = "svgs/muted.svg";
    } else {
        mute = false;
        document.querySelector("#muteBtn > img").src = "svgs/sound.svg";
    }

    console.log(`Muted = ${mute}`);
}
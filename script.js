let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highScore = 0;

let h3 = document.querySelector("h3");

let btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("gameFlash");

    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    level++;
    userSeq = [];

    h3.innerText = `Level : ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log('btn selectd', randIdx ,randColor, randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener("click", btnPress);
}



function checkSeq(idx) {
    if (highScore < level) {
        highScore = level;
    }
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was : <b>${level}</b> <br> Press any key to start.`;
        let h4 = document.querySelector("#highScore");
        h4.innerHTML = `<b>High Score : ${highScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    console.log("button press");
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkSeq(userSeq.length - 1);

}


function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}


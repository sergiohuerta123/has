let inning = 1;
let outs = 0;
let runs = 0;
let strikes = 0;
let balls = 0;
let lastPitch = "";

const inningEl = document.getElementById("inning");
const outsEl = document.getElementById("outs");
const runsEl = document.getElementById("runs");
const strikesEl = document.getElementById("strikes");
const ballsEl = document.getElementById("balls");
const messageEl = document.getElementById("field-message");

document.getElementById("pitch-btn").addEventListener("click", pitch);
document.getElementById("swing-btn").addEventListener("click", swing);
document.getElementById("reset-btn").addEventListener("click", resetGame);

function updateDisplay() {
    inningEl.textContent = inning;
    outsEl.textContent = outs;
    runsEl.textContent = runs;
    strikesEl.textContent = strikes;
    ballsEl.textContent = balls;
}

function pitch() {
    if (inning > 3) return;

    lastPitch = Math.random() < 0.65 ? "strike" : "ball";

    if (lastPitch === "ball") {
        balls++;
        messageEl.textContent = "Ball!";
        if (balls >= 4) {
            runs++;
            balls = 0;
            strikes = 0;
            messageEl.textContent = "Walk! You score!";
        }
    } else {
        messageEl.textContent = "Strike! Swing!";
    }

    updateDisplay();
}

function swing() {
    if (lastPitch !== "strike" || inning > 3) return;

    if (Math.random() > 0.7) {
        strikes++;
        messageEl.textContent = "Swing and miss!";
    } else {
        let hitRoll = Math.random();

        if (hitRoll < 0.1) {
            runs += 2;
            messageEl.textContent = "HOME RUN! ⚾🔥";
        } else if (hitRoll < 0.3) {
            runs++;
            messageEl.textContent = "Double!";
        } else {
            runs++;
            messageEl.textContent = "Single!";
        }

        strikes = 0;
        balls = 0;
    }

    if (strikes >= 3) {
        outs++;
        strikes = 0;
        balls = 0;
        messageEl.textContent = "Strikeout!";
    }

    if (outs >= 3) {
        inning++;
        outs = 0;
        messageEl.textContent = inning > 3 ? 
            "Game Over! Final Runs: " + runs :
            "Inning Over!";
    }

    updateDisplay();
}

function resetGame() {
    inning = 1;
    outs = 0;
    runs = 0;
    strikes = 0;
    balls = 0;
    lastPitch = "";
    messageEl.textContent = 'Click "Pitch" to start!';
    updateDisplay();
}

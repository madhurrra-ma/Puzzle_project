// ============================================
// N-Queens Visualizer
// script.js
// Part 1
// ============================================

// ---------------------------
// Global Variables
// ---------------------------

let n = 8;
let board = [];

let steps = 0;
let backtracks = 0;
let queensPlaced = 0;

let delay = 300;

// ---------------------------
// Solver Controller
// ---------------------------

let controller = {
    cancelled: false,
    paused: false,
    solving: false
};

// ---------------------------
// DOM Elements
// ---------------------------

const boardDiv = document.getElementById("board");

const solveBtn = document.getElementById("solveBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const themeBtn = document.getElementById("themeBtn");

const nInput = document.getElementById("nValue");
const speedSlider = document.getElementById("speed");

const stepsText = document.getElementById("steps");
const backtracksText = document.getElementById("backtracks");
const queenText = document.getElementById("queenCount");
const timeText = document.getElementById("time");

const statusText = document.getElementById("status");

const rowText = document.getElementById("currentRow");
const colText = document.getElementById("currentCol");

const logBox = document.getElementById("logBox");

// ---------------------------
// Create Board
// ---------------------------

function createBoard(size) {

    n = size;

    board = Array.from(
        { length: n },
        () => Array(n).fill(0)
    );

    boardDiv.innerHTML = "";

    boardDiv.style.gridTemplateColumns =
        `repeat(${n},1fr)`;

    boardDiv.style.gridTemplateRows =
        `repeat(${n},1fr)`;

    for (let row = 0; row < n; row++) {

        for (let col = 0; col < n; col++) {

            const cell = document.createElement("div");

            cell.className =
                `cell ${(row + col) % 2 === 0 ? "white" : "black"}`;

            cell.id = `cell-${row}-${col}`;

            boardDiv.appendChild(cell);

        }
    }
}

// ---------------------------
// Sleep
// ---------------------------

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

// ---------------------------
// Wait Function
// ---------------------------

async function wait() {

    while (controller.paused) {

        if (controller.cancelled)
            return false;

        await sleep(100);

    }

    await sleep(delay);

    return !controller.cancelled;

}

// ---------------------------
// Theme
// ---------------------------

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML = "☀️ Light";

    }

    else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML = "🌙 Theme";

    }

}

(function () {

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML = "☀️ Light";

    }

})(); 

// ============================================
// UI Functions
// ============================================

// ---------------------------
// Place Queen
// ---------------------------

function placeQueen(row, col) {

    board[row][col] = 1;

    queensPlaced++;

    queenText.innerText = queensPlaced;

    const cell = document.getElementById(`cell-${row}-${col}`);

    cell.innerHTML = "♛";

    cell.classList.add("queen");
}

// ---------------------------
// Remove Queen
// ---------------------------

function removeQueen(row, col) {

    board[row][col] = 0;

    queensPlaced--;

    queenText.innerText = queensPlaced;

    const cell = document.getElementById(`cell-${row}-${col}`);

    cell.innerHTML = "";

    cell.classList.remove("queen");
}

// ---------------------------
// Highlight Cell
// ---------------------------

function markCell(row, col, className) {

    const cell = document.getElementById(`cell-${row}-${col}`);

    cell.classList.add(className);

}

// ---------------------------
// Clear Highlight
// ---------------------------

function clearMarks(row, col) {

    const cell = document.getElementById(`cell-${row}-${col}`);

    cell.classList.remove(
        "checking",
        "safe-cell",
        "unsafe-cell",
        "backtrack-cell"
    );

}

// ---------------------------
// Statistics
// ---------------------------

function updateSteps() {

    steps++;

    stepsText.innerText = steps;

}

function updateBacktracks() {

    backtracks++;

    backtracksText.innerText = backtracks;

}

function updateCurrentPosition(row, col) {

    rowText.innerText = row;

    colText.innerText = col;

}

// ---------------------------
// Status
// ---------------------------

function setStatus(message) {

    statusText.innerText = message;

}

// ---------------------------
// Time
// ---------------------------

function setTime(ms) {

    timeText.innerText = `${ms} ms`;

}

// ---------------------------
// Logging
// ---------------------------

function log(message) {

    const p = document.createElement("p");

    p.innerHTML = message;

    logBox.appendChild(p);

    logBox.scrollTop = logBox.scrollHeight;

}

// ---------------------------
// Clear Log
// ---------------------------

function clearLog() {

    logBox.innerHTML = "";

}

// ---------------------------
// Reset Everything
// ---------------------------

function resetBoard() {

    // Cancel current solve

    controller.cancelled = true;

    controller.paused = false;

    controller.solving = false;

    // Fresh controller

    controller = {

        cancelled: false,

        paused: false,

        solving: false

    };

    createBoard(parseInt(nInput.value));

    initializeSolver();

    // Reset counters

    steps = 0;
    backtracks = 0;
    queensPlaced = 0;

    stepsText.innerText = 0;
    backtracksText.innerText = 0;
    queenText.innerText = 0;

    rowText.innerText = "-";
    colText.innerText = "-";

    setTime(0);

    setStatus("Ready");

    clearLog();

    pauseBtn.innerHTML = "⏸ Pause";

    solveBtn.disabled = false;

    nInput.disabled = false;

}

// ---------------------------
// Pause / Resume
// ---------------------------

function togglePause() {

    if (!controller.solving)
        return;

    controller.paused = !controller.paused;

    if (controller.paused) {

        pauseBtn.innerHTML = "▶ Resume";

        setStatus("Paused");

    }

    else {

        pauseBtn.innerHTML = "⏸ Pause";

        setStatus("Solving...");

    }

}

// ============================================
// Start Solving
// ============================================

async function startSolving() {

    if (controller.solving)
        return;

    // Start from a clean state
    resetBoard();

    controller.solving = true;

    solveBtn.disabled = true;
    nInput.disabled = true;

    delay = parseInt(speedSlider.value);

    setStatus("Solving...");

    log("🚀 Started solving...");

    const startTime = performance.now();

    const found = await solveNQueens(0);

    if (!controller.cancelled) {

        const endTime = performance.now();

        setTime(Math.round(endTime - startTime));

        if (found) {

            setStatus("Solution Found 🎉");

            log("✅ Solution Found");

        }

        else {

            setStatus("No Solution");

            log("❌ No Solution Exists");

        }

    }

    controller.solving = false;

    solveBtn.disabled = false;

    nInput.disabled = false;

    pauseBtn.innerHTML = "⏸ Pause";
}

// ============================================
// Button Events
// ============================================

solveBtn.addEventListener("click", startSolving);

pauseBtn.addEventListener("click", togglePause);

resetBtn.addEventListener("click", resetBoard);

themeBtn.addEventListener("click", toggleTheme);

// ============================================
// Speed Slider
// ============================================

speedSlider.addEventListener("input", () => {

    delay = parseInt(speedSlider.value);

});

// ============================================
// Board Size Change
// ============================================

nInput.addEventListener("change", () => {

    if (controller.solving)
        return;

    resetBoard();

});

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        togglePause();

    }

    if (e.key === "r" || e.key === "R") {

        resetBoard();

    }

});

// ============================================
// Initialize
// ============================================

createBoard(8);

initializeSolver();

resetBoard();
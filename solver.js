// ============================================
// solver.js
// Backtracking Algorithm
// ============================================

// Helper Arrays

let cols = [];
let diag1 = [];
let diag2 = [];

// ============================================
// Initialize Solver
// ============================================

function initializeSolver() {

    cols = new Array(n).fill(false);

    diag1 = new Array(2 * n - 1).fill(false);

    diag2 = new Array(2 * n - 1).fill(false);

}

// ============================================
// Check Safe Position
// ============================================

function isSafe(row, col) {

    return (
        !cols[col] &&
        !diag1[row - col + n - 1] &&
        !diag2[row + col]
    );

}

// ============================================
// Place Queen
// ============================================

function addQueen(row, col) {

    board[row][col] = 1;

    cols[col] = true;

    diag1[row - col + n - 1] = true;

    diag2[row + col] = true;

    placeQueen(row, col);

}

// ============================================
// Remove Queen
// ============================================

function removeQueenSolver(row, col) {

    board[row][col] = 0;

    cols[col] = false;

    diag1[row - col + n - 1] = false;

    diag2[row + col] = false;

    removeQueen(row, col);

}

// ============================================
// Recursive Solver
// ============================================

async function solveNQueens(row) {

    if (controller.cancelled)
        return false;

    if (row === n) {

        log("🎉 Solution Found!");

        return true;

    }

    for (let col = 0; col < n; col++) {

        if (controller.cancelled)
            return false;

        updateCurrentPosition(row, col);

        updateSteps();

        log(`Checking (${row}, ${col})`);

        markCell(row, col, "checking");

        if (!(await wait()))
            return false;

        clearMarks(row, col);

        if (isSafe(row, col)) {

            markCell(row, col, "safe-cell");

            log(`✔ Safe -> Place Queen`);

            if (!(await wait()))
                return false;

            clearMarks(row, col);

            addQueen(row, col);

            if (!(await wait()))
                return false;

            if (await solveNQueens(row + 1))
                return true;

            log(`↩ Backtracking`);

            removeQueenSolver(row, col);

            updateBacktracks();

            markCell(row, col, "backtrack-cell");

            if (!(await wait()))
                return false;

            clearMarks(row, col);

        }

        else {

            markCell(row, col, "unsafe-cell");

            log(`✖ Unsafe`);

            if (!(await wait()))
                return false;

            clearMarks(row, col);

        }

    }

    return false;

}
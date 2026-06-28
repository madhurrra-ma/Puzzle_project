# ♛ N-Queens Visualizer

An interactive web application that visualizes the **N-Queens Problem** using the **Backtracking Algorithm**. This project demonstrates how backtracking explores possible queen placements, backtracks when conflicts occur, and eventually finds a valid solution.

## 🚀 Live Demo

🔗 https://cool-daifuku-0c82f7.netlify.app/

## 📸 Preview

(Add screenshots or GIFs here)

---

## 📖 About the Project

The N-Queens Problem is a classic backtracking problem where **N queens** must be placed on an **N × N chessboard** such that no two queens attack each other.

This visualizer allows users to watch the algorithm execute step by step, making it easier to understand how backtracking works.

---

## ✨ Features

- ♛ Interactive chessboard visualization
- 🎯 Adjustable board size (4–12)
- ▶️ Play, Pause, Resume, and Reset controls
- ⏱️ Adjustable animation speed
- 📊 Real-time statistics
  - Steps executed
  - Backtracks
  - Queens placed
  - Execution time
- 🌙 Clean and responsive UI
- 📱 Works on desktop and mobile browsers

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

---

## 🧠 Algorithm

This project uses the **Backtracking Algorithm**.

### Steps:

1. Start from the first row.
2. Try placing a queen in every column.
3. Check whether the position is safe.
4. If safe, place the queen and move to the next row.
5. If no valid position exists, backtrack.
6. Continue until all queens are placed.

### Time Complexity

- Worst Case: **O(N!)**

### Space Complexity

- **O(N²)** (board representation)

---

## 📂 Project Structure

```
N-Queens-Visualizer/
│── index.html
│── style.css
│── script.js
│── solver.js
│── README.md
```

---

## 💻 Running Locally

1. Clone the repository

```bash
git clone https://github.com/your-username/N-Queens-Visualizer.git
```

2. Open the project folder

```bash
cd N-Queens-Visualizer
```

3. Open `index.html` in your browser.

Or use the VS Code Live Server extension.

---

## 🎮 How to Use

1. Select the board size.
2. Adjust the animation speed.
3. Click **Start Visualization**.
4. Watch the algorithm place queens and backtrack.
5. Use Pause/Resume or Reset anytime.

---

## 📸 Screenshots

### Home

(Add image)

### Visualization

(Add image)

### Solution Found

(Add image)

---

## 🎯 Future Improvements

- Multiple solution visualization
- Dark/Light theme toggle
- Save board as image
- Display recursion tree
- Compare with other solving approaches
- Sound effects and animations

---

## 👩‍💻 Author

**Madhura Melgiri**

- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ If you found this project useful

Give this repository a ⭐ on GitHub!

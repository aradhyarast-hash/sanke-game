# 🐍 Snake Game

A classic Snake game built with HTML, CSS, and vanilla JavaScript. Eat food, grow longer, and beat your high score before you hit the wall or yourself.

## Features

- Grid-based snake movement with keyboard controls
- Live **score** that increases by 10 for every food eaten
- **High score** saved in the browser using `localStorage`
- **Timer** that counts how long you survive
- Game-over popup with a **Restart** button
- Timer and game loop stop the moment the snake loses

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

## How to Play

1. Open `index.html` in your browser.
2. Use the arrow keys to move the snake.
3. Eat the food to grow and score points.
4. Avoid hitting the walls or the snake's own body.
5. When the game ends, click **Restart** to play again.

## Controls

| Key | Action |
|-----|--------|
| ⬆️ Arrow Up | Move up |
| ⬇️ Arrow Down | Move down |
| ⬅️ Arrow Left | Move left |
| ➡️ Arrow Right | Move right |

## Project Structure

```
snake-game/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run Locally

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

Then open `index.html` in your browser. No installation or build step needed.

## How It Works

- The board is a grid of `div` cells created with JavaScript.
- `setInterval` drives the game loop (`render()`) and a separate timer.
- Both intervals are cleared on game over and recreated on restart.
- The high score is stored with `localStorage` so it persists between sessions.

## Future Improvements

- Difficulty levels (speed increases as score grows)
- Sound effects
- Pause / resume button
- Mobile touch controls

## Author

**Aradhya**
GitHub: [@your-username](https://github.com/your-username)

## License

This project is open source and available under the [MIT License](LICENSE).
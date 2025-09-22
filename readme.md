# Snake.js - CLI Snake Game

This is a Node.js version of the classic Snake game that runs in your terminal.

## Features

- 🐍 Classic Snake gameplay
- 🎮 Keyboard controls (arrow keys)
- 🏆 Score tracking
- 🎯 Food collection and snake growth
- ⚡ Collision detection (walls and self)
- 📺 ASCII art game board

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## How to Play

Start the game:
```bash
npm start
```

Or run directly:
```bash
node index.js
```

### Controls

- **Arrow Keys**: Move the snake (Up, Down, Left, Right)
- **Q**: Quit the game
- **Ctrl+C**: Exit immediately

### Game Rules

- Use arrow keys to control the snake
- Eat food (★) to grow longer and increase your score
- Avoid hitting walls or your own body
- The game gets more challenging as your snake grows longer!

### Symbols

- `●` - Snake head
- `○` - Snake body
- `★` - Food

## Game Mechanics

- The snake moves automatically in the current direction
- Change direction using arrow keys (can't reverse into yourself)
- Each food eaten increases your score by 1
- Game ends when snake hits wall or itself
- Snake grows longer each time it eats food

Enjoy playing Snake in your terminal! 🐍

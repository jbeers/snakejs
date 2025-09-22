#!/usr/bin/env node

const keypress = require('keypress');

class SnakeGame {
  constructor() {
    this.width = 20;
    this.height = 15;
    this.snake = [{ x: 10, y: 7 }];
    this.direction = { x: 1, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.gameOver = false;
    
    // Make stdin begin emitting "keypress" events
    keypress(process.stdin);
    
    // Listen for the "keypress" event
    process.stdin.on('keypress', (ch, key) => {
      if (key && key.ctrl && key.name === 'c') {
        this.quit();
      }
      this.handleInput(key);
    });
    
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    return food;
  }

  handleInput(key) {
    if (!key) return;
    
    switch (key.name) {
      case 'up':
        if (this.direction.y !== 1) {
          this.direction = { x: 0, y: -1 };
        }
        break;
      case 'down':
        if (this.direction.y !== -1) {
          this.direction = { x: 0, y: 1 };
        }
        break;
      case 'left':
        if (this.direction.x !== 1) {
          this.direction = { x: -1, y: 0 };
        }
        break;
      case 'right':
        if (this.direction.x !== -1) {
          this.direction = { x: 1, y: 0 };
        }
        break;
      case 'q':
        this.quit();
        break;
    }
  }

  update() {
    if (this.gameOver) return;

    // Calculate new head position
    const head = { ...this.snake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    // Check wall collision
    if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height) {
      this.gameOver = true;
      return;
    }

    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver = true;
      return;
    }

    // Add new head
    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.food = this.generateFood();
    } else {
      // Remove tail if no food eaten
      this.snake.pop();
    }
  }

  render() {
    // Clear screen
    console.clear();
    
    // Create game board
    const board = Array(this.height).fill().map(() => Array(this.width).fill(' '));
    
    // Place snake
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        board[segment.y][segment.x] = '●'; // Head
      } else {
        board[segment.y][segment.x] = '○'; // Body
      }
    });
    
    // Place food
    board[this.food.y][this.food.x] = '★';
    
    // Print board
    console.log('┌' + '─'.repeat(this.width) + '┐');
    board.forEach(row => {
      console.log('│' + row.join('') + '│');
    });
    console.log('└' + '─'.repeat(this.width) + '┘');
    
    // Print score
    console.log(`Score: ${this.score}`);
    
    if (this.gameOver) {
      console.log('\n🐍 GAME OVER! 🐍');
      console.log('Press Q to quit or Ctrl+C to exit');
    } else {
      console.log('\nUse arrow keys to move, Q to quit, Ctrl+C to exit');
    }
  }

  quit() {
    console.clear();
    console.log(`\n🐍 Thanks for playing Snake! 🐍`);
    console.log(`Final Score: ${this.score}`);
    process.exit(0);
  }

  start() {
    console.log('🐍 Welcome to Snake! 🐍');
    console.log('Use arrow keys to move, Q to quit, Ctrl+C to exit\n');
    
    this.render();
    
    // Game loop
    setInterval(() => {
      this.update();
      this.render();
    }, 200); // 200ms delay for game speed
  }
}

// Start the game
const game = new SnakeGame();
game.start();
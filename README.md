# Bike Adventure Game

A simple 2D game built with React and TypeScript where you can navigate around a map.

## Features

- Dynamic map system with terrain and objects
- Camera controls with zoom functionality
- Minimap for easy navigation
- Player movement with boundary constraints

## How to Play

- Use WASD keys to move around
- Press + and - keys to zoom in and out
- Press R to reset the game

## Development

This project uses:
- Vite
- React
- TypeScript

### Getting Started

```
npm install
npm run dev
```

## Project Structure

- `src/game/` - Core game logic
  - `config.ts` - Game configuration
  - `types.ts` - TypeScript type definitions
  - `map.ts` - Map generation and entity rendering
  - `camera.ts` - Camera positioning and zoom
  - `player.ts` - Player movement
  - `minimap.ts` - Minimap rendering

- `src/hooks/` - React hooks
  - `useKeyboard.ts` - Keyboard input handling
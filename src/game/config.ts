// Game-wide configuration

// Display settings
export const DISPLAY = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  BACKGROUND_COLOR: '#f0f0f0',
  MINIMAP_WIDTH: 200,
  MINIMAP_HEIGHT: 150,
  PLAYER_COLOR: 'blue',
  TERRAIN_COLORS: ['#3a8c3f', '#458f43', '#54a14a', '#5caa54'],
  OBJECT_COLORS: ['#d18f2d', '#e3a745', '#c47f3a', '#b6782f']
};

// Player settings
export const PLAYER = {
  SPEED: 5,
  SIZE: 30,
  INITIAL_POSITION: { x: 1000, y: 1000 },
  Z_INDEX: 10
};

// Map settings
export const MAP = {
  WIDTH: 2000,
  HEIGHT: 2000,
  TERRAIN_COUNT: 50,
  OBJECT_COUNT: 30,
  TERRAIN_SIZE_MIN: 50,
  TERRAIN_SIZE_MAX: 150,
  OBJECT_SIZE_MIN: 20,
  OBJECT_SIZE_MAX: 50
};

// Camera settings
export const CAMERA = {
  ZOOM_LEVELS: [0.5, 0.75, 1, 1.5, 2],
  DEFAULT_ZOOM_INDEX: 2
};

// Boundary settings
export const BOUNDARIES = {
  TOP: true,
  RIGHT: true,
  BOTTOM: true,
  LEFT: true
};
import { DISPLAY } from './config';
import { Camera, GameMap, Vector2D } from './types';

// Camera creation
export const createCamera = (
  viewportWidth: number = DISPLAY.CANVAS_WIDTH,
  viewportHeight: number = DISPLAY.CANVAS_HEIGHT
): Camera => ({
  position: { x: 0, y: 0 },
  viewport: { width: viewportWidth, height: viewportHeight }
});

// Get center point of an entity
export const getEntityCenter = (
  position: Vector2D,
  size: { width: number, height: number }
): Vector2D => ({
  x: position.x + size.width / 2,
  y: position.y + size.height / 2
});

// Center camera on a position with map boundary constraints
export const centerCameraOn = (
  camera: Camera,
  targetPos: Vector2D,
  map: GameMap
): Camera => {
  // Center camera on target
  let x = targetPos.x - (camera.viewport.width / 2);
  let y = targetPos.y - (camera.viewport.height / 2);
  
  // Apply map boundaries
  if (map.boundaries.left) {
    x = Math.max(0, x);
  }
  
  if (map.boundaries.top) {
    y = Math.max(0, y);
  }
  
  if (map.boundaries.right) {
    x = Math.min(map.size.width - camera.viewport.width, x);
  }
  
  if (map.boundaries.bottom) {
    y = Math.min(map.size.height - camera.viewport.height, y);
  }
  
  return {
    ...camera,
    position: { x, y }
  };
};

// Apply zoom to camera viewport
export const applyZoom = (
  camera: Camera,
  zoomFactor: number
): Camera => ({
  position: camera.position,
  viewport: {
    width: camera.viewport.width / zoomFactor,
    height: camera.viewport.height / zoomFactor
  }
});
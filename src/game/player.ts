import { PLAYER } from './config';
import { Entity, GameMap, Vector2D } from './types';

// Movement directions
export type Direction = 'up' | 'down' | 'left' | 'right';

// Find the player entity in the map
export const getPlayer = (map: GameMap): Entity | undefined => 
  map.entities.find(entity => entity.type === 'player');

// Calculate new position based on direction
export const getNewPlayerPosition = (
  currentPos: Vector2D,
  direction: Direction,
  speed: number = PLAYER.SPEED
): Vector2D => {
  const { x, y } = currentPos;
  
  switch (direction) {
    case 'up':    return { x, y: y - speed };
    case 'down':  return { x, y: y + speed };
    case 'left':  return { x: x - speed, y };
    case 'right': return { x: x + speed, y };
  }
};

// Apply map boundaries to a position
export const applyBoundaries = (
  position: Vector2D,
  entitySize: { width: number, height: number },
  map: GameMap
): Vector2D => {
  let { x, y } = position;
  
  if (map.boundaries.left && x < 0) {
    x = 0;
  }
  
  if (map.boundaries.top && y < 0) {
    y = 0;
  }
  
  if (map.boundaries.right && x > map.size.width - entitySize.width) {
    x = map.size.width - entitySize.width;
  }
  
  if (map.boundaries.bottom && y > map.size.height - entitySize.height) {
    y = map.size.height - entitySize.height;
  }
  
  return { x, y };
};

// Move player in a direction and return updated map
export const movePlayer = (
  map: GameMap,
  direction: Direction,
  speed: number = PLAYER.SPEED
): GameMap => {
  // Find player entity
  const playerIndex = map.entities.findIndex(entity => entity.type === 'player');
  if (playerIndex === -1) return map;
  
  const player = map.entities[playerIndex];
  
  // Calculate new position
  const newPosition = getNewPlayerPosition(player.position, direction, speed);
  
  // Apply map boundaries
  const boundedPosition = applyBoundaries(newPosition, player.size, map);
  
  // Update player entity
  const updatedPlayer = {
    ...player,
    position: boundedPosition
  };
  
  // Create new entities array with updated player
  const updatedEntities = [...map.entities];
  updatedEntities[playerIndex] = updatedPlayer;
  
  // Return updated map
  return {
    ...map,
    entities: updatedEntities
  };
};
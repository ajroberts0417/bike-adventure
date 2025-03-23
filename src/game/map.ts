import { BOUNDARIES, DISPLAY, MAP, PLAYER } from './config';
import { Camera, Entity, GameMap, ScreenEntity, Size, Vector2D } from './types';

// Viewport calculation functions
export const isInViewport = (
  entityPos: Vector2D,
  entitySize: Size,
  cameraPos: Vector2D,
  viewportSize: Size
): boolean => (
  entityPos.x < cameraPos.x + viewportSize.width &&
  entityPos.x + entitySize.width > cameraPos.x &&
  entityPos.y < cameraPos.y + viewportSize.height &&
  entityPos.y + entitySize.height > cameraPos.y
);

export const toScreenPosition = (
  worldPos: Vector2D,
  cameraPos: Vector2D
): Vector2D => ({
  x: worldPos.x - cameraPos.x,
  y: worldPos.y - cameraPos.y
});

export const getVisibleEntities = (
  map: GameMap,
  camera: Camera
): ScreenEntity[] => {
  // Sort by zIndex and then filter and map in a single pass
  return [...map.entities]
    .sort((a, b) => a.zIndex - b.zIndex)
    .filter(entity => isInViewport(
      entity.position,
      entity.size,
      camera.position,
      camera.viewport
    ))
    .map(entity => ({
      ...entity,
      screenPosition: toScreenPosition(entity.position, camera.position)
    }));
};

// Rendering functions
export const renderEntities = (
  ctx: CanvasRenderingContext2D,
  entities: ScreenEntity[]
): void => {
  // Clear the canvas first
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Render each visible entity
  entities.forEach(entity => {
    ctx.fillStyle = entity.color;
    ctx.fillRect(
      entity.screenPosition.x,
      entity.screenPosition.y,
      entity.size.width,
      entity.size.height
    );
  });
};

// Create a sample map
export const createMap = (): GameMap => {
  const entities: Entity[] = [];

  // Add terrain entities
  const getRandomTerrainColor = () => {
    const colors = DISPLAY.TERRAIN_COLORS;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  for (let i = 0; i < MAP.TERRAIN_COUNT; i++) {
    entities.push({
      id: `terrain-${i}`,
      position: {
        x: Math.floor(Math.random() * MAP.WIDTH),
        y: Math.floor(Math.random() * MAP.HEIGHT)
      },
      size: {
        width: MAP.TERRAIN_SIZE_MIN + Math.floor(Math.random() * (MAP.TERRAIN_SIZE_MAX - MAP.TERRAIN_SIZE_MIN)),
        height: MAP.TERRAIN_SIZE_MIN + Math.floor(Math.random() * (MAP.TERRAIN_SIZE_MAX - MAP.TERRAIN_SIZE_MIN))
      },
      color: getRandomTerrainColor(),
      zIndex: 1,
      type: 'terrain'
    });
  }

  // Add object entities
  const getRandomObjectColor = () => {
    const colors = DISPLAY.OBJECT_COLORS;
    return colors[Math.floor(Math.random() * colors.length)];
  };

  for (let i = 0; i < MAP.OBJECT_COUNT; i++) {
    entities.push({
      id: `object-${i}`,
      position: {
        x: Math.floor(Math.random() * MAP.WIDTH),
        y: Math.floor(Math.random() * MAP.HEIGHT)
      },
      size: {
        width: MAP.OBJECT_SIZE_MIN + Math.floor(Math.random() * (MAP.OBJECT_SIZE_MAX - MAP.OBJECT_SIZE_MIN)),
        height: MAP.OBJECT_SIZE_MIN + Math.floor(Math.random() * (MAP.OBJECT_SIZE_MAX - MAP.OBJECT_SIZE_MIN))
      },
      color: getRandomObjectColor(),
      zIndex: 2,
      type: 'object'
    });
  }

  // Add player
  entities.push({
    id: 'player',
    position: { ...PLAYER.INITIAL_POSITION },
    size: { width: PLAYER.SIZE, height: PLAYER.SIZE },
    color: DISPLAY.PLAYER_COLOR,
    zIndex: PLAYER.Z_INDEX,
    type: 'player'
  });

  return {
    size: { width: MAP.WIDTH, height: MAP.HEIGHT },
    entities,
    boundaries: {
      top: BOUNDARIES.TOP,
      right: BOUNDARIES.RIGHT,
      bottom: BOUNDARIES.BOTTOM,
      left: BOUNDARIES.LEFT
    }
  };
};
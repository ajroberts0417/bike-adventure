import { GameMap, Camera, Entity, Size } from './types';

// Calculate scale for minimap
export const getMinimapScale = (
  mapSize: Size,
  minimapSize: Size
): { x: number, y: number } => ({
  x: minimapSize.width / mapSize.width,
  y: minimapSize.height / mapSize.height
});

// Draw entity on minimap with appropriate color and scale
export const drawMinimapEntity = (
  ctx: CanvasRenderingContext2D,
  entity: Entity,
  scale: { x: number, y: number }
): void => {
  // Get appropriate color based on entity type
  let color: string;
  switch (entity.type) {
    case 'player':
      color = 'red';
      break;
    case 'terrain':
      color = 'rgba(0, 100, 0, 0.7)';
      break;
    default:
      color = 'rgba(200, 200, 200, 0.7)';
  }
  
  ctx.fillStyle = color;
  
  // Draw scaled entity
  ctx.fillRect(
    entity.position.x * scale.x,
    entity.position.y * scale.y,
    entity.size.width * scale.x,
    entity.size.height * scale.y
  );
};

// Render camera viewport on minimap
export const drawMinimapViewport = (
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  scale: { x: number, y: number }
): void => {
  // Make the viewport indicator more visible
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  
  // Draw a rectangle representing the current viewport area
  const viewportX = camera.position.x * scale.x;
  const viewportY = camera.position.y * scale.y;
  const viewportWidth = camera.viewport.width * scale.x;
  const viewportHeight = camera.viewport.height * scale.y;
  
  // Draw viewport rectangle
  ctx.strokeRect(viewportX, viewportY, viewportWidth, viewportHeight);
  
  // Add a semi-transparent fill to make it more visible
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(viewportX, viewportY, viewportWidth, viewportHeight);
};

// Render minimap
export const renderMinimap = (
  ctx: CanvasRenderingContext2D,
  map: GameMap,
  camera: Camera,
  minimapSize: Size
): void => {
  // Clear minimap area with a darker background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, minimapSize.width, minimapSize.height);
  
  // Draw border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.strokeRect(0, 0, minimapSize.width, minimapSize.height);
  
  // Get scale factor
  const scale = getMinimapScale(map.size, minimapSize);
  
  // Draw all entities
  map.entities.forEach(entity => {
    drawMinimapEntity(ctx, entity, scale);
  });
  
  // Draw camera viewport
  drawMinimapViewport(ctx, camera, scale);
};
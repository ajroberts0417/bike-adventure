// Basic position and size types
export type Vector2D = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type EntityType = 'terrain' | 'object' | 'player';

// Entity type
export type Entity = {
  id: string;
  position: Vector2D;
  size: Size;
  color: string;
  zIndex: number;
  type: EntityType;
};

// Camera type
export type Camera = {
  position: Vector2D;
  viewport: Size;
};

// Boundaries type
export type Boundaries = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

// Map type
export type GameMap = {
  size: Size;
  entities: Entity[];
  boundaries: Boundaries;
};

// Viewport entity with screen position
export type ScreenEntity = Entity & {
  screenPosition: Vector2D;
};
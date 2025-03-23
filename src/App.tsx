import { useState, useEffect, useRef } from 'react'
import { useKey, useKeys } from './hooks/useKeyboard'
import { CAMERA, DISPLAY } from './game/config'
import { applyZoom, centerCameraOn, createCamera, getEntityCenter } from './game/camera'
import { createMap, getVisibleEntities, renderEntities } from './game/map'
import { renderMinimap } from './game/minimap'
import { Direction, getPlayer, movePlayer } from './game/player'
import { Camera, GameMap } from './game/types'
import './App.css'

function App() {
  // Canvas refs
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game state
  const [gameMap, setGameMap] = useState<GameMap>(() => createMap());
  const [camera, setCamera] = useState<Camera>(() => createCamera());
  const [zoomIndex, setZoomIndex] = useState(CAMERA.DEFAULT_ZOOM_INDEX);
  
  // Movement handler
  const handleMove = (direction: Direction) => {
    setGameMap(prevMap => movePlayer(prevMap, direction));
  };
  
  // Zoom handlers - they should recenter the camera on player
  const zoomIn = () => {
    setZoomIndex(prev => {
      const newIndex = Math.min(prev + 1, CAMERA.ZOOM_LEVELS.length - 1);
      // Re-center camera after zoom - handled by the effect hook
      return newIndex;
    });
  };
  
  const zoomOut = () => {
    setZoomIndex(prev => {
      const newIndex = Math.max(prev - 1, 0);
      // Re-center camera after zoom - handled by the effect hook
      return newIndex;
    });
  };
  
  // Key bindings
  useKeys({
    'w': () => handleMove('up'),
    'a': () => handleMove('left'),
    's': () => handleMove('down'),
    'd': () => handleMove('right'),
    '+': zoomIn,
    '-': zoomOut,
    '=': zoomIn // Alternative for + without shift
  });
  
  // Reset game
  const resetGame = () => {
    setGameMap(createMap());
    setCamera(createCamera());
    setZoomIndex(CAMERA.DEFAULT_ZOOM_INDEX);
  };
  
  // Register reset key
  useKey('r', resetGame);
  
  // Center camera on player (runs after player moves or zoom changes)
  useEffect(() => {
    const player = getPlayer(gameMap);
    if (!player) return;
    
    // Get player center position
    const playerCenter = getEntityCenter(player.position, player.size);
    
    // Apply zoom to camera viewport
    const zoomFactor = CAMERA.ZOOM_LEVELS[zoomIndex];
    const zoomedCamera = applyZoom(camera, zoomFactor);
    
    // Center the zoomed camera on player
    const centeredCamera = centerCameraOn(zoomedCamera, playerCenter, gameMap);
    
    // Update camera position while keeping original viewport size
    setCamera(prev => ({
      position: centeredCamera.position,
      viewport: prev.viewport
    }));
  }, [gameMap, zoomIndex, camera.viewport]);
  
  // Render game canvas
  useEffect(() => {
    const canvas = gameCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get current zoom factor
    const zoomFactor = CAMERA.ZOOM_LEVELS[zoomIndex];
    
    // Apply zoom to get the zoomed viewport
    const zoomedCamera = applyZoom(camera, zoomFactor);
    
    // Get visible entities using the zoomed camera
    const visibleEntities = getVisibleEntities(gameMap, zoomedCamera);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up transform for zoom
    ctx.save();
    ctx.scale(zoomFactor, zoomFactor);
    
    // Render entities
    renderEntities(ctx, visibleEntities);
    
    // Restore transform
    ctx.restore();
  }, [gameMap, camera, zoomIndex]);
  
  // Render minimap (with correct viewport size based on zoom)
  useEffect(() => {
    const canvas = minimapCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get current zoom factor
    const zoomFactor = CAMERA.ZOOM_LEVELS[zoomIndex];
    
    // Apply zoom to get the zoomed viewport for minimap display
    const zoomedCamera = applyZoom(camera, zoomFactor);
    
    // Render minimap with the zoomed camera
    renderMinimap(ctx, gameMap, zoomedCamera, {
      width: DISPLAY.MINIMAP_WIDTH,
      height: DISPLAY.MINIMAP_HEIGHT
    });
  }, [gameMap, camera, zoomIndex]);
  
  // Get player position for display
  const player = getPlayer(gameMap);
  const playerPos = player ? player.position : { x: 0, y: 0 };
  
  return (
    <div className="app">
      <h1>Bike Adventure</h1>
      
      <div className="game-container">
        {/* Main game canvas */}
        <canvas
          ref={gameCanvasRef}
          width={DISPLAY.CANVAS_WIDTH}
          height={DISPLAY.CANVAS_HEIGHT}
          style={{ backgroundColor: DISPLAY.BACKGROUND_COLOR }}
        />
        
        {/* Minimap overlay */}
        <div className="minimap-container">
          <canvas
            ref={minimapCanvasRef}
            width={DISPLAY.MINIMAP_WIDTH}
            height={DISPLAY.MINIMAP_HEIGHT}
          />
        </div>
      </div>
      
      <div className="controls">
        <button 
          onClick={zoomOut}
          disabled={zoomIndex === 0}
        >
          Zoom Out (-)
        </button>
        <div className="zoom-level">
          <div className="zoom-label">Zoom Level</div>
          <div className="zoom-value">{CAMERA.ZOOM_LEVELS[zoomIndex].toFixed(2)}x</div>
          <div className="zoom-indicator">
            {CAMERA.ZOOM_LEVELS.map((_, i) => (
              <div 
                key={i} 
                className={`zoom-pip ${i === zoomIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        <button 
          onClick={zoomIn}
          disabled={zoomIndex === CAMERA.ZOOM_LEVELS.length - 1}
        >
          Zoom In (+)
        </button>
      </div>
      
      <div className="game-info">
        <p>Player: x={playerPos.x.toFixed(0)}, y={playerPos.y.toFixed(0)}</p>
        <p>Camera: x={camera.position.x.toFixed(0)}, y={camera.position.y.toFixed(0)}</p>
        <p>Map: {gameMap.size.width}x{gameMap.size.height}</p>
        <p>Controls: WASD to move, +/- to zoom, R to reset</p>
      </div>
    </div>
  )
}

export default App
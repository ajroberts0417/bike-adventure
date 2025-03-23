import { calculateMove } from './App';

describe('calculateMove', () => {
  // Define test variables
  const position = { x: 50, y: 50 };
  const speed = 5;
  const squareSize = 30;
  const canvas = { width: 600, height: 400 };
  
  // Test movement in each direction
  test('moves up correctly', () => {
    const boundaries = { top: false, left: false, right: false, bottom: false };
    const result = calculateMove(position, 'up', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 50, y: 45 });
  });
  
  test('moves down correctly', () => {
    const boundaries = { top: false, left: false, right: false, bottom: false };
    const result = calculateMove(position, 'down', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 50, y: 55 });
  });
  
  test('moves left correctly', () => {
    const boundaries = { top: false, left: false, right: false, bottom: false };
    const result = calculateMove(position, 'left', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 45, y: 50 });
  });
  
  test('moves right correctly', () => {
    const boundaries = { top: false, left: false, right: false, bottom: false };
    const result = calculateMove(position, 'right', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 55, y: 50 });
  });
  
  // Test boundary enforcement
  test('enforces top boundary', () => {
    const boundaries = { top: true, left: false, right: false, bottom: false };
    const positionAtTop = { x: 50, y: 0 };
    const result = calculateMove(positionAtTop, 'up', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 50, y: 0 });
  });
  
  test('enforces left boundary', () => {
    const boundaries = { top: false, left: true, right: false, bottom: false };
    const positionAtLeft = { x: 0, y: 50 };
    const result = calculateMove(positionAtLeft, 'left', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 0, y: 50 });
  });
  
  test('enforces right boundary', () => {
    const boundaries = { top: false, left: false, right: true, bottom: false };
    const positionAtRight = { x: canvas.width - squareSize, y: 50 };
    const result = calculateMove(positionAtRight, 'right', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: canvas.width - squareSize, y: 50 });
  });
  
  test('enforces bottom boundary', () => {
    const boundaries = { top: false, left: false, right: false, bottom: true };
    const positionAtBottom = { x: 50, y: canvas.height - squareSize };
    const result = calculateMove(positionAtBottom, 'down', speed, squareSize, boundaries, canvas);
    expect(result).toEqual({ x: 50, y: canvas.height - squareSize });
  });
  
  // Test with no canvas (should not apply boundary checks)
  test('handles missing canvas dimensions', () => {
    const boundaries = { top: true, left: true, right: true, bottom: true };
    const result = calculateMove(position, 'up', speed, squareSize, boundaries, undefined);
    expect(result).toEqual({ x: 50, y: 45 });
  });
});
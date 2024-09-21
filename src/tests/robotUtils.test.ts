import { turnLeft, turnRight, moveForward } from '../utils/robotUtils'; // Update this with the correct path to the file
import { Position, Room } from '../types/types'; // Update this with the correct path to the file

// Describe the test suite for turnLeft function
describe('turnLeft', () => {
  test('turn left from North to West', () => {
    const result = turnLeft('N');
    expect(result).toBe('W');
  });

  test('turn left from West to South', () => {
    const result = turnLeft('W');
    expect(result).toBe('S');
  });

  test('turn left from South to East', () => {
    const result = turnLeft('S');
    expect(result).toBe('E');
  });

  test('turn left from East to North', () => {
    const result = turnLeft('E');
    expect(result).toBe('N');
  });

  test('four consecutive left turns return to North', () => {
    let direction: Position["direction"] = 'N';
    direction = turnLeft(direction); // 'W'
    direction = turnLeft(direction); // 'S'
    direction = turnLeft(direction); // 'E'
    direction = turnLeft(direction); // 'N'
    expect(direction).toBe('N');
  });
});

// Describe the test suite for turnRight function
describe('turnRight', () => {
  test('turn right from North to East', () => {
    const result = turnRight('N');
    expect(result).toBe('E');
  });

  test('turn right from East to South', () => {
    const result = turnRight('E');
    expect(result).toBe('S');
  });

  test('turn right from South to West', () => {
    const result = turnRight('S');
    expect(result).toBe('W');
  });

  test('turn right from West to North', () => {
    const result = turnRight('W');
    expect(result).toBe('N');
  });

  test('four consecutive right turns return to North', () => {
    let direction: Position["direction"] = 'N';
    direction = turnRight(direction); // 'E'
    direction = turnRight(direction); // 'S'
    direction = turnRight(direction); // 'W'
    direction = turnRight(direction); // 'N'
    expect(direction).toBe('N');
  });
});

// Describe the test suite for moveForward function
describe('moveForward', () => {
  const room: Room = { width: 5, depth: 5 };

  test('move forward North within bounds', () => {
    const position: Position = { x: 2, y: 2, direction: 'N' };
    const result = moveForward(position, room);
    expect(result).toEqual({ x: 2, y: 1, direction: 'N' });
  });

  test('move forward East within bounds', () => {
    const position: Position = { x: 2, y: 2, direction: 'E' };
    const result = moveForward(position, room);
    expect(result).toEqual({ x: 3, y: 2, direction: 'E' });
  });

  test('move forward West out of bounds', () => {
    const position: Position = { x: 0, y: 2, direction: 'W' };
    const result = moveForward(position, room);
    expect(result).toBeNull();
  });

  test('move forward North out of bounds', () => {
    const position: Position = { x: 2, y: 0, direction: 'N' };
    const result = moveForward(position, room);
    expect(result).toBeNull();
  });

  test('move forward South within bounds', () => {
    const position: Position = { x: 3, y: 3, direction: 'S' };
    const result = moveForward(position, room);
    expect(result).toEqual({ x: 3, y: 4, direction: 'S' });
  });
});

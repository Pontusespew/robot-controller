import { Position, Room } from '../types/types';


// Function to turn left, rotating in the order N -> W -> S -> E
export function turnLeft(direction: Position["direction"]): Position["direction"] {
    const directions: Array<Position["direction"]> = ['N', 'W', 'S', 'E'];
    const idx = directions.indexOf(direction);
    return directions[(idx + 1) % directions.length]; // Move one step left in the direction array
}

// Function to turn right, rotating in the order N -> E -> S -> W
export function turnRight(direction: Position["direction"]): Position["direction"] {
    const directions: Array<Position["direction"]> = ['N', 'E', 'S', 'W']; // Correct order for turning right
    const idx = directions.indexOf(direction);
    return directions[(idx + 1) % directions.length]; // Move one step right in the direction array
}

// Function to move the robot forward in its current direction
export function moveForward(position: Position, room: Room): Position | null {
    let { x, y, direction } = position;

    // Adjust x and y based on the current direction
    switch (direction) {
        case 'N':
            y -= 1; 
            break;
        case 'E':
            x += 1;
            break;
        case 'S':
            y += 1;
            break;
        case 'W':
            x -= 1;
            break;
    }

    // Check if the new position is within the bounds of the room
    if (x < 0 || y < 0 || x >= room.width || y >= room.depth) {
        return null;
    }

    // Return the updated position and direction
    return { x, y, direction };
}
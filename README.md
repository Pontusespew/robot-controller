# Robot Navigation Project

This project simulates a simple robot navigation system within a room. The robot can turn left, turn right, and move forward based on its current position and direction. The project includes utility functions to manage robot movement and direction, as well as test cases using Jest to validate functionality.

---

## Project Structure

```
.
├── src
│   ├── components
│   │   ├── RobotRoomVisualization.tsx // Component to visualize the room & robot
│   │   ├── robotSimulator.tsx         // Component to visualize the room & robot
│   ├── tests
│   │   └── robotUtils.test.ts         // Test cases for the utility functions
│   ├── types
│   │   ├── types.ts                   // All TypeScript interfaces
│   ├── utils
│   │   ├── robotUtils.ts              // Utility functions for robot movement
├── package.json                       // Project dependencies and scripts
├── tsconfig.json                      // TypeScript configuration
```

---

## Features

- **Turn Left (`turnLeft`)**: The robot rotates counterclockwise. From North (`N`), it goes to West (`W`), and then South (`S`), East (`E`), and back to North.
- **Turn Right (`turnRight`)**: The robot rotates clockwise. From North (`N`), it goes to East (`E`), South (`S`), West (`W`), and back to North.
- **Move Forward (`moveForward`)**: The robot moves forward based on its current direction (N, S, E, W). The movement is constrained within the boundaries of a defined room.

---

## Functions Overview

### 1. **turnLeft**

```typescript
export function turnLeft(direction: Position["direction"]): Position["direction"]
```
- Rotates the robot 90 degrees to the left.
- Accepts one parameter, the current direction (N, E, S, W), and returns the new direction after the turn.
  
**Example:**
```ts
const result = turnLeft('N');  // Expected result: 'W'
```

### 2. **turnRight**

```typescript
export function turnRight(direction: Position["direction"]): Position["direction"]
```
- Rotates the robot 90 degrees to the right.
- Accepts one parameter, the current direction (N, E, S, W), and returns the new direction after the turn.
  
**Example:**
```ts
const result = turnRight('N');  // Expected result: 'E'
```

### 3. **moveForward**

```typescript
export function moveForward(position: Position, room: Room): Position | null
```
- Moves the robot forward in the current direction by adjusting its X or Y coordinates.
- Checks if the new position is within the room's boundaries.
- Returns the updated position if valid, or `null` if the move is out of bounds.

**Example:**
```ts
const room = { width: 5, depth: 5 };
const position = { x: 2, y: 2, direction: 'N' };
const result = moveForward(position, room);  // Expected result: { x: 2, y: 1, direction: 'N' }
```

---

## Testing

This project uses **Jest** as the testing framework. The test cases are written in TypeScript and located in the `src/tests/robotUtils.test.ts` file. 

### Running the Tests

1. **Install Dependencies**
   If you haven't already installed the necessary dependencies, run the following command:
   ```bash
   npm install
   ```

2. **Run Tests**
   To run the tests, use the following command:
   ```bash
   npm test
   ```

### Example Test Cases

Test scenarios are implemented for each function, covering normal, boundary, and wrap-around behavior.

- **`turnLeft` and `turnRight`**: Tests for each possible direction, including wrap-around cases where multiple turns return to the starting point.
- **`moveForward`**: Tests for movement within bounds and out-of-bounds cases.

---

## Installation and Setup

### Prerequisites

- **Node.js** (version 12 or higher)
- **npm** (comes bundled with Node.js)
- **TypeScript**

### Clone the repository

```bash
git clone https://github.com/Pontusespew/robot-navigation.git
cd robot-navigation
```

### Install Dependencies

```bash
npm install
```

### Compile TypeScript

```bash
npm run build
```

---

## Project Scripts

- **`npm run build`**: Compiles the TypeScript files.
- **`npm test`**: Runs the Jest test suite.
- **`npm start`**: Starts the project (if applicable).

---

## Example Usage

```typescript
import { turnLeft, turnRight, moveForward } from './utils/robotUtils';

// Example room of size 5x5
const room = { width: 5, depth: 5 };

// Example starting position
const position = { x: 2, y: 2, direction: 'N' };

// Move forward
const newPosition = moveForward(position, room);
console.log(newPosition); // { x: 2, y: 1, direction: 'N' }

// Turn left
const newDirection = turnLeft('N');
console.log(newDirection); // 'W'
```

---

## Future Enhancements

- **Diagonal Movement**: Extend the robot to move diagonally.
- **Obstacles**: Introduce obstacles in the room for the robot to navigate around.
- **Enhanced Movement**: Support for multi-step movements and rotations.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

Developed by **Your Name**.

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';  // Useful helpers from drei
import { Room, Robot } from '../types/types';
import { moveForward, turnLeft, turnRight } from '../utils/robotUtils';
import RobotRoomVisualization from './RobotRoomVisualization';

// Initial room and robot data
const initialRoom: Room = { width: 5, depth: 5 };
const initialRobot: Robot = { position: { x: 3, y: 3, direction: 'N' } };

const RobotSimulator: React.FC = () => {
    const [room, setRoom] = useState<Room>(initialRoom);
    const [robot, setRobot] = useState<Robot>(initialRobot);
    const [commands, setCommands] = useState<string>('');


    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    // Function to execute robot commands
    const executeCommands = async () => {
        let currentPosition = { ...robot.position };
        for (const command of commands) {
            switch (command) {
                case 'L':
                    currentPosition.direction = turnLeft(currentPosition.direction);
                    break;
                case 'R':
                    currentPosition.direction = turnRight(currentPosition.direction);
                    break;
                case 'F':
                    const newPosition = moveForward(currentPosition, room);
                    if (!newPosition) {
                        alert(`ERROR: Out of bounds at ${currentPosition.x} ${currentPosition.y}`);
                        return;
                    }
                    currentPosition = newPosition;
                    break;
                default:
                    alert('ERROR: Invalid command');
                    return;
            }
            setRobot({ position: currentPosition });
            await timeout(500);
        }

    };

    return (
        <div>
            {/* 3D Canvas for rendering the room and robot */}
            <Canvas>
                {/* Ambient light and a directional light to illuminate the scene */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 5, 5]} intensity={1} />
                <RobotRoomVisualization room={room} robot={robot} />
                <OrbitControls enableZoom={true} /> {/* Allows rotating the view */}
            </Canvas>

            {/* Command Input & Run Button */}
            <div style={{ position: "fixed", left: "10px", top: "10px", display: "flex", flexDirection: "column", border:"1px #CCC solid", background:"rgba(277,277,277,0.5)", borderRadius:"8px", padding:"8px" }}>

                <small>Dimensions</small>
                <input
                    type="range"
                    min="5" max="50"
                    value={room.depth}
                    onChange={(e) => setRoom({ depth: Number(e.target.value), width: Number(e.target.value) })}
                    placeholder="Size"
                />
                <small>Command</small>
                <input
                    type="text"
                    value={commands}
                    onChange={(e) => setCommands(e.target.value.toUpperCase())}
                    placeholder="Enter commands (e.g. LFFR)"
                />
                <button onClick={async () => await executeCommands()}>Run</button>
                <button onClick={async () => await setRobot(initialRobot)}>Reset</button>
            </div>
            <div style={{ position: "fixed", left: "10px", bottom: "10px" }}>
                Facing: {robot.position.direction} <br />
                Position: {robot.position.x}, {robot.position.y}
            </div>
        </div>
    );
};

export default RobotSimulator;

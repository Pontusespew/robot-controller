import React, { useEffect, useRef } from 'react';
import { Vector3, Group } from 'three'; 
import { useSpring, a } from '@react-spring/three'; // Animated components from react-spring
import { useFrame } from '@react-three/fiber';
import { Room, Robot, Position } from '../types/types';

interface Props {
  room: Room;
  robot: Robot;
}

const DIRECTION_TO_ROTATION: Record<Position['direction'], number> = {
  N: 0,  // Facing North (no rotation needed)
  E: Math.PI / 2, // 90 degrees clockwise for East
  S: Math.PI,     // 180 degrees for South
  W: -Math.PI / 2, // 270 degrees (or -90 degrees) for West
};

// Vector representation for direction arrows
const DIRECTION_TO_VECTOR: Record<Position['direction'], Vector3> = {
  N: new Vector3(0, 0, -1), // North -> negative Z direction
  E: new Vector3(1, 0, 0),  // East -> positive X direction
  S: new Vector3(0, 0, 1),  // South -> positive Z direction
  W: new Vector3(-1, 0, 0), // West -> negative X direction
};

// Visualization of the Room and the Robot with animation
const RobotRoomVisualization: React.FC<Props> = ({ room, robot }) => {
  const [{ position, rotation }, api] = useSpring(() => ({
    position: [robot.position.x, 0.6, robot.position.y],
    rotation: [0, DIRECTION_TO_ROTATION[robot.position.direction], 0],
    config: { mass: 1, tension: 200, friction: 25 },
  }));

  // Update spring values whenever the robot's position or direction changes
  useEffect(() => {
    api.start({
      position: [robot.position.x, 0.6, robot.position.y],
      rotation: [0, DIRECTION_TO_ROTATION[robot.position.direction], 0],
    });
  }, [robot.position.x, robot.position.y, robot.position.direction, api]);

  const groupRef = useRef<Group | null>(null);

  // Update the rotation using useFrame
  useFrame(() => {
    if (groupRef.current) {
      const [x, y, z] = rotation.get();
      groupRef.current.rotation.set(x, y, z);
    }
  });

  return (
    <>
      {/* Create a grid to represent the floor (Room) */}
      <gridHelper
        args={[room.width, room.depth, 'black', 'gray']}
        position={[room.width / 2 - 0.5, 0, room.depth / 2 - 0.5]}
      />

      {/* Realistic Robot Model ;) */}
      <a.group
        ref={groupRef}
        position={position.to((x, y, z) => [x, y, z])}
        scale={[0.5, 0.5, 0.5]}
      >
        {/* Head */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ffd966" /> 
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>

        {/* Left Arm */}
        <mesh position={[-0.6, 0.7, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
          <meshStandardMaterial color="#ff5733" />
        </mesh>

        {/* Right Arm */}
        <mesh position={[0.6, 0.7, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
          <meshStandardMaterial color="#ff5733" />
        </mesh>

        {/* Left Leg */}
        <mesh position={[-0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} /> 
          <meshStandardMaterial color="#8A2BE2" />
        </mesh>

        {/* Right Leg */}
        <mesh position={[0.2, -0.6, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 32]} />
          <meshStandardMaterial color="#8A2BE2" />
        </mesh>
      </a.group>

      {/* ArrowHelper to visualize the direction */}
      <a.arrowHelper
        args={[
          DIRECTION_TO_VECTOR[robot.position.direction],
          new Vector3(robot.position.x, 1, robot.position.y),
          0.5, // Length of the arrow
          0x00ff00,
        ]}
      />
    </>
  );
};

export default RobotRoomVisualization;

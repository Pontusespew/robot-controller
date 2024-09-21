export interface Room {
    width: number;
    depth: number;
}

export interface Position {
    x: number;
    y: number;
    direction: 'N' | 'E' | 'S' | 'W';
}

export interface Robot {
    position: Position;
}
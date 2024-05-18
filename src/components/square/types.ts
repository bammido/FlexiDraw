export interface Size {
    width: number;
    height: number;
}

export interface Position {
    x: number;
    y: number;
}

export type MatrixType = Size & Position

export type SquareStyledProps = Size & Position
import styled from "styled-components";
import { MatrixType} from "../square/types";

export const ResinzingDiv = styled.div<MatrixType>`
    position: absolute;
    /* background-color: blue; */
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    top: ${props => `${props.y}px`};
    left: ${props => `${props.x}px`};
    user-select: none;

    border: 1px dashed black;
    transition: width 100ms, height 100ms;
`

export const Resizer = styled.div`
    position: absolute;
    border-radius: 100%;
    background-color: black;
    width: 8px;
    height: 8px;
    right: -4px;
    bottom: -4px;
    cursor: se-resize;
`

export const Rotater = styled.div`
    position: absolute;
    border-radius: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0.25rem;
    width: 15px;
    height: 15px;
    bottom: calc(-15px - 1rem);
    left: calc(50% - 8px - 0.5rem);
    cursor: grabbing;
`
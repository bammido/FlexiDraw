import styled from "styled-components";
import { MatrixType} from "./types";

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
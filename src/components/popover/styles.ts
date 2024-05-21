import styled from "styled-components";

export const PopOverDiv = styled.div<{show: boolean, height: number}>`
    top: calc(100% + .25rem);
    max-height: ${props => props.show? `${props.height}px` : 0};
    z-index: 100;
    background: gray;
    box-shadow: 0px 2px 4px 0px #00000026;
    position: absolute;
    overflow-y: scroll;
    transition: 300ms;
    scrollbar-width: none;
`;
import styled from "styled-components";

export const ElementOptionsContainer = styled.div<{expanded: boolean}>`
    background-color: #252627;
    padding: 1.5rem 1rem;

    width: ${props => props.expanded? "300px": "50px"};
    position: relative;

    transition: width 500ms ease-in;

    display: flex;
`;

export const ExpandElementOptions = styled.div<{expanded: boolean}>`
    position: absolute;
    top: 50%;
    left: 100%;
    color: #fff;
    background-color: gray;
    font-size: 30px;
    transform: translate(-50%, -50%) rotate(${props => props.expanded? '-180deg' : '0deg'});
    border-radius: 100%;
    display: flex;
    align-items: center;

    opacity: 0.7;
    transition: opacity 150ms ease-in, transform 1s ease-in;

    &:hover {
        opacity: 1;
        transition: opacity 150ms ease-in, transform 1s ease-in;
        cursor: pointer;
    }
`;

export const ElementConfigsContainer = styled.div`
    flex-grow: 1;
    color: white;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const ElementConfig = styled.div`
    display: flex;
    gap: .5rem;
`;

export const ElementsConfigsInput = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;

    max-width: 50px;

    &:focus {
        outline: none;
    }
`;
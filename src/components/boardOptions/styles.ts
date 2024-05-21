import styled from "styled-components";

export const BoardOptionsContainer = styled.div`
    background-color: #252627;
    padding: 1.5rem 1rem;

    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const AddShapesContainer = styled.div`
    position: relative;
`;

export const AddShapesPopOver = styled.div`
    padding: .5rem;

    display: flex;
    gap: .5rem;
    
    font-size: 25px;
`;

export const BoardOptionButton = styled.button`
    background-color: transparent;
    color: #fff;
    opacity: 0.7;
    transition: opacity 150 ease-in;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: none;

    &:hover {
        opacity: 1;
        transition: opacity 150 ease-in;
        cursor: pointer;
    }
`;
import styled from "styled-components";

export const ElementOptionsContainer = styled.div<{expanded: boolean}>`
    /* background-color: #252627; */
    background-color: #FFFAFA;
    width: ${props => props.expanded? "300px": "50px"};
    position: relative;

    transition: width 500ms ease-in;
    height: 100%;
`;

export const ExpandElementOptions = styled.div<{expanded: boolean}>`
    z-index: 100;
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
    padding: 1.5rem 1rem;
    flex-grow: 1;
    color: #252627;
    display: flex;
    flex-direction: column;

    gap: 1.5rem;

    width: calc(300px - 2rem);
    max-height: 600px;

    overflow-x: hidden;
    overflow-y: scroll;
`;

export const ElementConfigSectionAux = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & h2 {
        font-size: 0.85rem;
    }

    border-bottom: 1px solid gray;
    padding-bottom: 1rem;
`;

export const ElementConfigSection = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 1rem;
`; 

export const ElementConfig = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;

export const ElementsConfigsInput = styled.input`
    background-color: transparent;
    border: 1px solid #252627;
    color: #252627;
    padding: 0.5rem 0.7rem;

    max-width: 80px;

    opacity: 0.7;
    transition: opacity 150ms ease-in;

    text-align: center;
    &:hover {
        opacity: 1;
        transition: opacity 150ms ease-in;
    }

    &:focus {
        outline: none;
    }
`;

export const ElementsConfigsInputSecundary = styled.input`
     background-color: transparent;
    border: 1px solid #252627;
    color: #252627;
    padding: 0.5rem;

    max-width: 20px;

    opacity: 0.7;
    transition: opacity 150ms ease-in;

    text-align: center;
    &:hover {
        opacity: 1;
        transition: opacity 150ms ease-in;
    }

    &:focus {
        outline: none;
    }
`;

export const ElementBorderStyleExampleContainer = styled.div<{name: string}>`
    padding: 0.8rem;
    cursor: pointer;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    align-items: center;
`;

export const ElementBorderStyleExample = styled.div<{
    borderStyle: "dashed" | "dotted" | "solid" | "double", 
    borderColor: string}>`
    border-width: 1px;
    border-style: ${props => props.borderStyle};
    border-color: ${props => props.borderColor};

    width: 100px;

`;
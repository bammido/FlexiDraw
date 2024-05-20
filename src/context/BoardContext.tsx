import { SpringRef, SpringValue } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { createContext, useContext, useState } from "react"

interface ISize {
    width: number; 
    height: number;
}

export interface IElementConfigs {
    x: number;
    y: number;
    width: number;
    height: number;
    backgroundColor: string;
    borderColor: string;
}

export type ElApi = SpringRef<IElementConfigs>

export interface IElConfigsSpring {
    x: SpringValue<number>;
    y: SpringValue<number>;
    width: SpringValue<number>;
    height: SpringValue<number>;
    backgroundColor: SpringValue<string>;
    borderColor: SpringValue<string>;
}

export interface IElProps extends IElConfigsSpring {
    id: string;
    api: ElApi;
    binds: {
        dragBind: () => ReactDOMAttributes
    },
    dragging: boolean;
    resizing: boolean;
    toggleResinzing: (isResizing: boolean) => void;
}

export interface IElementOnboard <T = IElProps> extends IElementConfigs {
    id: string;
    El: (props: T) => JSX.Element
}

interface IBoardContext {
    size: ISize;
    setSize: React.Dispatch<React.SetStateAction<ISize>>;
    elementsOnBoard: IElementOnboard[]; 
    setElementsOnBoard: React.Dispatch<React.SetStateAction<IElementOnboard[]>>;
    addElement: (el: IElementOnboard) => void
}

const boardContext = createContext<IBoardContext | null>(null)

export function BoardContextProvider({ children } : { children: React.ReactNode }) {
    const [size, setSize] = useState<ISize>({width: 0, height: 0})
    const [elementsOnBoard, setElementsOnBoard] = useState<IElementOnboard[]>([])

    function addElement(el: IElementOnboard) {
        setElementsOnBoard(prev => [...prev, el])
    }

    return <boardContext.Provider value={{ size, setSize, elementsOnBoard, setElementsOnBoard, addElement }}>
        {children}
    </boardContext.Provider>
}

export function useBoardContext() {
    return useContext(boardContext) as IBoardContext
}
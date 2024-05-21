import { SpringRef, SpringValue } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { createContext, useContext, useMemo, useState } from "react"

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

interface IUpdateConfigs {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
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
    handleClickElement: () => void;
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
    addElement: (el: IElementOnboard) => void;
    resetBoard: () => void;
    selectElement: (id: string) => void;
    unselectElement: (id: string) => void;
    selectedElementConfigs: IElementConfigs | undefined;
    updateElement: (id: string, updatedConfigs: IUpdateConfigs) => void
    selectedElement: string;
}

const boardContext = createContext<IBoardContext | null>(null)

export function BoardContextProvider({ children } : { children: React.ReactNode }) {
    const [size, setSize] = useState<ISize>({width: 0, height: 0})
    const [elementsOnBoard, setElementsOnBoard] = useState<IElementOnboard[]>([])
    const [selectedElement, setSelectedElement] = useState("")

    function addElement(el: IElementOnboard) {
        setElementsOnBoard(prev => [...prev, el])
    }

    function resetBoard() {
        setElementsOnBoard([])
    }

    function selectElement(id: string) {
        setSelectedElement(id)
    }

    function unselectElement(id: string) {
        selectedElement === id && setSelectedElement("")
    }

    function updateElement(id: string, updatedConfigs: IUpdateConfigs) {
        setElementsOnBoard(prev =>  prev.map((el) => (el.id === id ? { ...el, ...updatedConfigs } : el))) 
    }

    const selectedElementConfigs = useMemo(() => elementsOnBoard.find(el => el.id === selectedElement), [selectElement, elementsOnBoard])

    return <boardContext.Provider value={{ 
        size, setSize, elementsOnBoard, setElementsOnBoard, addElement, resetBoard, selectedElement, selectElement, unselectElement, selectedElementConfigs, updateElement }}>
        {children}
    </boardContext.Provider>
}

export function useBoardContext() {
    return useContext(boardContext) as IBoardContext
}
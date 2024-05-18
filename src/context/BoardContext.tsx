import { createContext, useContext, useState } from "react"

interface ISize {
    width: number; 
    height: number;
}

interface IElement {
    id: string; 
    type: string; 
}

interface IBoardContext {
    size: ISize;
    setSize: React.Dispatch<React.SetStateAction<ISize>>;
    elementsOnBoard: IElement[]; 
    setElementsOnBoard: React.Dispatch<React.SetStateAction<IElement[]>>;
}

const boardContext = createContext<IBoardContext | null>(null)

export function BoardContextProvider({ children } : { children: React.ReactNode }) {
    const [size, setSize] = useState<ISize>({width: 0, height: 0})
    const [elementsOnBoard, setElementsOnBoard] = useState<IElement[]>([])

    return <boardContext.Provider value={{ size, setSize, elementsOnBoard, setElementsOnBoard }}>
        {children}
    </boardContext.Provider>
}

export function useBoardContext() {
    return useContext(boardContext) as IBoardContext
}
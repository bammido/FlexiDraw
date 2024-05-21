import { createContext, useContext, useState } from "react"

interface IElementsConfigsContext {
    resinzingScale: number;
    elementOptionsRef: React.MutableRefObject<HTMLDivElement | null>;
    setElementOptionsRef: React.Dispatch<React.SetStateAction<React.MutableRefObject<HTMLDivElement | null>>>
}

const elementsConfigs = createContext<IElementsConfigsContext | null>(null)

export function ElementsConfigsContext({ children } : { children: React.ReactNode }) {
    const [resinzingScale] = useState<number>(1.25)
    const [elementOptionsRef, setElementOptionsRef] = useState<React.MutableRefObject<HTMLDivElement | null>>({current: null})

    return <elementsConfigs.Provider value={{resinzingScale, elementOptionsRef, setElementOptionsRef}}>
        {children}
    </elementsConfigs.Provider>
}

export function useElementsConfigsContext() {
    return useContext(elementsConfigs) as IElementsConfigsContext
}
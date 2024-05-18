import { createContext, useContext, useState } from "react"

interface IElementsConfigsContext {
    resinzingScale: number
}

const elementsConfigs = createContext<IElementsConfigsContext | null>(null)

export function ElementsConfigsContext({ children } : { children: React.ReactNode }) {
    const [resinzingScale] = useState<number>(1.25)

    return <elementsConfigs.Provider value={{resinzingScale}}>
        {children}
    </elementsConfigs.Provider>
}

export function useElementsConfigsContext() {
    return useContext(elementsConfigs) as IElementsConfigsContext
}
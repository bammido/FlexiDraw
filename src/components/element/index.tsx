/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSpring, animated, SpringValue } from "@react-spring/web";
import { IElProps, IElementOnboard } from "../../context/BoardContext"
import { useRef, useState } from "react";
// import { useDrag } from "@use-gesture/react";
import { useElementsConfigsContext } from "../../context/ElementsConfigsContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Resizer } from "./styles";
import useDrag from "./hooks/useDrag";
import useResize from "./hooks/useResize";

export interface IResizerConfigs {
    resizerWidth: number;
    resizerHeight: number;
    resizerX: number;
    resizerY: number;
}

export interface IResizerConfigsSpring {
    resizerWidth: SpringValue<number>, 
    resizerHeight: SpringValue<number>, 
    resizerX: SpringValue<number>, 
    resizerY: SpringValue<number>
}

export default function BoardElement({
        El,
        id,
        ...elementConfig
    } : IElementOnboard<IElProps> ){

    const [configs, api] = useSpring(() => ({ ...elementConfig }));

    const {x, y, width, height} = configs

    const {resinzingScale} = useElementsConfigsContext()

    const [resizerConfigsSpring, resizerApi] = useSpring(() => ({ 
        resizerX: x.get() - (width.get() * (resinzingScale - 1))/ 2 , 
        resizerY: y.get() - (height.get() * (resinzingScale - 1))/ 2, 
        resizerWidth: width.get() * resinzingScale, 
        resizerHeight: height.get() * resinzingScale }));

    const [resizing, setResizing] = useState(false)
    const [dragging, setDragging] = useState(false)
    
    const containerRef = useRef<HTMLDivElement | null>(null)
    const resizerRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick<HTMLDivElement | null, undefined>({ref: containerRef, callback: () => setResizing(false)})

    const bindResizeDrag = useResize({elApi: api, resizerApi, resizerConfigsSpring, resizerRef, resizing})

    const bindDragSquare = useDrag({ elApi: api, 
        resizerApi, 
        elConfigsSpring: configs, 
        resizerConfigsSpring, 
        toogleDragging: (isDragging: boolean) => setDragging(isDragging)})
    
    return <>
    <animated.div ref={containerRef} {...bindResizeDrag()} >
            {resizing && <animated.div
                          style={{ 
                            touchAction: 'none',
                            x: resizerConfigsSpring.resizerX, 
                            y: resizerConfigsSpring.resizerY, 
                            width: resizerConfigsSpring.resizerWidth, 
                            height: resizerConfigsSpring.resizerHeight, 
                            position: 'absolute', 
                            border: '1px dashed black'}}
                        >
              <Resizer ref={resizerRef} />
            </animated.div>}
            
            <El 
                {...configs} 
                api={api} 
                id={id} 
                binds={{ dragBind: bindDragSquare }} 
                dragging={dragging} 
                resizing={resizing}
                toggleResinzing={(isResizing: boolean) => setResizing(isResizing)}
            />
        </animated.div>
    </>
}
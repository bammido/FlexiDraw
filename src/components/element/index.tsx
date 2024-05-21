
import { useSpring, animated, SpringValue } from "@react-spring/web";
import { IElProps, IElementOnboard, useBoardContext } from "../../context/BoardContext"
import { useRef, useState } from "react";
import { useElementsConfigsContext } from "../../context/ElementsConfigsContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Resizer } from "./styles";
import useDrag from "./hooks/useDrag";
import useResize from "./hooks/useResize";
import useHandleUpdateElement from "./hooks/useHandleUpdateElement";

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

    const {resinzingScale, elementOptionsRef} = useElementsConfigsContext()

    const [resizerConfigsSpring, resizerApi] = useSpring(() => ({ 
        resizerX: x.get() - (width.get() * (resinzingScale - 1))/ 2 , 
        resizerY: y.get() - (height.get() * (resinzingScale - 1))/ 2, 
        resizerWidth: width.get() * resinzingScale, 
        resizerHeight: height.get() * resinzingScale }));

    const [resizing, setResizing] = useState(false)
    const [dragging, setDragging] = useState(false)
    
    const containerRef = useRef<HTMLDivElement | null>(null)
    const resizerRef = useRef<HTMLDivElement | null>(null)

    useHandleUpdateElement({elApi: api, resizerApi, resizerConfigsSpring, elConfigsSpring: configs, id})
    
    const bindResizeDrag = useResize({id, elApi: api, resizerApi, resizerConfigsSpring, resizerRef, resizing, elConfigsSpring: configs})

    const bindDragSquare = useDrag({ 
        id,
        elApi: api, 
        resizerApi, 
        elConfigsSpring: configs, 
        resizerConfigsSpring, 
        toogleDragging: (isDragging: boolean) => setDragging(isDragging)})

    const { selectElement, unselectElement } = useBoardContext()

    function handleOutsideClick() {
        unselectElement(id)
        setResizing(false)
    }

    useOutsideClick<HTMLDivElement | null, HTMLDivElement | null>({ref: containerRef, callback: handleOutsideClick, altRef: elementOptionsRef })

    function handleClickElement() {
        setResizing(true)
        selectElement(id)
    }
    
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
                handleClickElement={handleClickElement}
            />
        </animated.div>
    </>
}
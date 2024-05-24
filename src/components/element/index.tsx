
import { useSpring, animated, SpringValue } from "@react-spring/web";
import { IElProps, IElementOnboard, useBoardContext } from "../../context/BoardContext"
import { useRef, useState } from "react";
import { useElementsConfigsContext } from "../../context/ElementsConfigsContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Resizer } from "./styles";
import useDrag from "./hooks/useDrag";
import useResize from "./hooks/useResize";
import useHandleUpdateElement from "./hooks/useHandleUpdateElement";
// import { FaRotate } from "react-icons/fa6";
// import { useDrag as useDragReactGesture } from "@use-gesture/react";

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

    const {x, y, width, height, borderWidth} = configs

    const {resinzingScale, elementOptionsRef} = useElementsConfigsContext()

    const [resizerConfigsSpring, resizerApi] = useSpring(() => ({ 
        resizerX: x.get() - ((width.get() + (borderWidth.get() * 2)) * (resinzingScale - 1))/ 2 , 
        resizerY: y.get() - ((height.get() + (borderWidth.get() * 2)) * (resinzingScale - 1))/ 2, 
        resizerWidth: (width.get() + (borderWidth.get() * 2)) * resinzingScale, 
        resizerHeight: (height.get() + (borderWidth.get() * 2)) * resinzingScale }));

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

    const { selectElement, unselectElement, boardOptionsRef } = useBoardContext()

    function handleOutsideClick() {
        unselectElement(id)
        setResizing(false)
    }

    useOutsideClick<HTMLDivElement | null, HTMLDivElement | null>({
        ref: containerRef, callback: handleOutsideClick, 
        altRef: elementOptionsRef,
        altRefs: [boardOptionsRef]
    })

    function handleClickElement() {
        setResizing(true)
        selectElement(id)
    }

    // const bindRotate = useDragReactGesture(({ offset: [ox, oy], event, movement }) => {
    //     const centerX = configs.x.get() + configs.width.get() / 2;
    //     const centerY = configs.y.get() + configs.height.get() / 2;

    //     console.log(movement)
    
    //     const clientX = event.clientX;
    //     const clientY = event.clientY;
    
    //     const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    
    //     api.start({ rotation: angle });
    //   });
    
    return <>
    <animated.div ref={containerRef} {...bindResizeDrag()}>
            {resizing && <animated.div
                          style={{ 
                            touchAction: 'none',
                            x: resizerConfigsSpring.resizerX, 
                            y: resizerConfigsSpring.resizerY, 
                            width: resizerConfigsSpring.resizerWidth, 
                            height: resizerConfigsSpring.resizerHeight, 
                            position: 'absolute',
                            border: '1px dashed black'
                        }}>
              <Resizer ref={resizerRef} />
              {/* <Rotater {...bindRotate()}><FaRotate /></Rotater> */}
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
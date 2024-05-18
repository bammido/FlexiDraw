import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Resizer } from "./styles";
import { useDrag } from '@use-gesture/react';
import { useElementsConfigsContext } from "../../context/ElementsConfigsContext";

export default function Square() {
    const {resinzingScale} = useElementsConfigsContext()

    const [{ x, y, width, height }, api] = useSpring(() => ({ x: 0, y: 0, width: 50, height: 50 }));
    const [{  resizerX, resizerY, resizerWidth, resizerHeight }, resizerApi] = useSpring(() => ({ 
      resizerX: x.get() - (width.get() * (resinzingScale - 1))/ 2 , 
      resizerY: y.get() - (height.get() * (resinzingScale - 1))/ 2, 
      resizerWidth: width.get() * resinzingScale, 
      resizerHeight: height.get() * resinzingScale }));
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);

    const resizerRef = useRef<HTMLDivElement | null>(null)

    const bindDrag = useDrag(({ offset , event}) => {
      if (resizing && event.target === resizerRef?.current) {
        const scale = ((resinzingScale - 1) - 1) * -1
          const newWidth = offset[0] * scale ;
          const newHeight = offset[1] * scale ;
          api.set({ width: newWidth, height: newHeight, 
            x: resizerX.get() + (offset[0] - newWidth) /2, y: resizerY.get() + (offset[1] - newHeight) /2});
          resizerApi.set({ resizerWidth: offset[0], resizerHeight: offset[1]})
      }
    }, {
      bounds: {
        left: 15,
        top: 15,
        bottom: 10000,
        right: 10000
      },
      from: [
        resizerWidth.get(),
        resizerHeight.get()
      ]
    })

    const bindDragSquare = useDrag(({ offset, down }) => {
      api.set({
          x: offset[0],
          y: offset[1]
      });
      resizerApi.set({
        resizerX: offset[0] - (resizerWidth.get() - width.get())/ 2,
        resizerY: offset[1] - (resizerHeight.get() - height.get())/ 2
      })
      setDragging(down)
    }, {
      from: [
        x.get(),
        y.get()
      ]
    })

    return (
        <animated.div {...bindDrag()}>
            {resizing && <animated.div
                          style={{ 
                            touchAction: 'none',
                            x: resizerX, 
                            y: resizerY, 
                            width: resizerWidth, 
                            height: resizerHeight, 
                            position: 'absolute', 
                            border: '1px dashed black'}}
                        >
              <Resizer ref={resizerRef} />
            </animated.div>}
            <animated.div
                onClick={() => setResizing(true)}
                style={{
                    touchAction: 'none',
                    x,
                    y,
                    backgroundColor: "black",
                    width: width,
                    height: height,
                    position: 'absolute',
                    cursor: dragging ? 'move' : 'default'
                }}
                {...bindDragSquare()}
            />
        </animated.div>
    );
}
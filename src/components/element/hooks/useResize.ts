import { useDrag } from "@use-gesture/react";
import { useElementsConfigsContext } from "../../../context/ElementsConfigsContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import { ElApi, IElConfigsSpring, useBoardContext } from "../../../context/BoardContext";
import { MutableRefObject } from "react";
import { SpringRef } from "@react-spring/web";
import useSetElApi from "./useSetElApi";

interface IUseResizingArgs {
    id: string;
    resizing: boolean;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    elApi: ElApi;
    resizerRef: MutableRefObject<HTMLDivElement | null>;
    elConfigsSpring: IElConfigsSpring;
}

export default function useResize({
    id,
    resizing,
    elConfigsSpring,
    resizerApi,
    resizerConfigsSpring,
    resizerRef,
    elApi} : IUseResizingArgs) {

    const {resinzingScale} = useElementsConfigsContext()
    const { updateElement } = useBoardContext()
    const { resize } = useSetElApi({ elApi, resizerApi, elConfigsSpring, resizerConfigsSpring })

    return useDrag(({ offset , event}) => {
        if (resizing && event.target === resizerRef?.current) {          
          const scale = ((resinzingScale - 1) - 1) * -1
          const newWidth = offset[0] * scale ;
          const newHeight = offset[1] * scale ;

          const resizerCenterX = resizerConfigsSpring.resizerX.get() + offset[0] / 2;
          const resizerCenterY = resizerConfigsSpring.resizerY.get() + offset[1] / 2;

          const newElemntX = resizerCenterX - (newWidth + elConfigsSpring.borderWidth.get() * 2) / 2
          const newElemntY = resizerCenterY - (newHeight + elConfigsSpring.borderWidth.get() * 2) / 2

          const newElConfigs = { width: newWidth, height: newHeight, 
            x: newElemntX,
            y: newElemntY
          }

          const newResizeConfigs = { resizerWidth: offset[0], resizerHeight: offset[1] }
          
          resize(newElConfigs, newResizeConfigs)
          updateElement(id, newElConfigs)
        }
      }, {
        bounds: {
          left: 15,
          top: 15,
          bottom: 10000,
          right: 10000
        },
        from: [
            resizerConfigsSpring.resizerWidth.get(),
            resizerConfigsSpring.resizerHeight.get()
        ]
      })
}
import { useDrag } from "@use-gesture/react";
import { useElementsConfigsContext } from "../../../context/ElementsConfigsContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import { ElApi } from "../../../context/BoardContext";
import { MutableRefObject } from "react";
import { SpringRef } from "@react-spring/web";

interface IUseResizingArgs {
    resizing: boolean;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    elApi: ElApi;
    resizerRef: MutableRefObject<HTMLDivElement | null>
}

export default function useResize({resizing,
    resizerApi,
    resizerConfigsSpring,
    resizerRef,
    elApi} : IUseResizingArgs) {
    const {resinzingScale} = useElementsConfigsContext()

    return useDrag(({ offset , event}) => {
        if (resizing && event.target === resizerRef?.current) {
          const scale = ((resinzingScale - 1) - 1) * -1
            const newWidth = offset[0] * scale ;
            const newHeight = offset[1] * scale ;
            elApi.set({ width: newWidth, height: newHeight, 
              x: resizerConfigsSpring.resizerX.get() + (offset[0] - newWidth) /2, y: resizerConfigsSpring.resizerY.get() + (offset[1] - newHeight) /2});
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
            resizerConfigsSpring.resizerWidth.get(),
            resizerConfigsSpring.resizerHeight.get()
        ]
      })
}
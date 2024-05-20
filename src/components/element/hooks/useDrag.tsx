import { SpringRef } from "@react-spring/web";
import { useDrag as useDragReactGesture } from "@use-gesture/react";
import { ElApi, IElConfigsSpring } from "../../../context/BoardContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";

interface IUseDragArgs {
    elApi: ElApi;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    elConfigsSpring: IElConfigsSpring;
    toogleDragging: (isDragging: boolean) => void
}

export default function useDrag({elApi, resizerApi, resizerConfigsSpring, elConfigsSpring, toogleDragging}: IUseDragArgs) {
    return useDragReactGesture(({ offset, down }) => {
        elApi.set({
            x: offset[0],
            y: offset[1]
        });
        resizerApi.set({
            resizerX: offset[0] - (resizerConfigsSpring.resizerWidth.get() - elConfigsSpring.width.get())/ 2,
            resizerY: offset[1] - (resizerConfigsSpring.resizerHeight.get() - elConfigsSpring.height.get())/ 2
        })
        toogleDragging(down)
        }, {
        from: [
            elConfigsSpring.x.get(),
            elConfigsSpring.y.get()
        ]
        })
}
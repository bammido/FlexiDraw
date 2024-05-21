import { SpringRef } from "@react-spring/web";
import { useDrag as useDragReactGesture } from "@use-gesture/react";
import { ElApi, IElConfigsSpring, useBoardContext } from "../../../context/BoardContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import useSetElApi from "./useSetElApi";

interface IUseDragArgs {
    id: string;
    elApi: ElApi;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    elConfigsSpring: IElConfigsSpring;
    toogleDragging: (isDragging: boolean) => void
}

export default function useDrag({elApi, resizerApi, resizerConfigsSpring, elConfigsSpring, toogleDragging, id}: IUseDragArgs) {
    const { updateElement } = useBoardContext()
    const {move} = useSetElApi({elApi, resizerApi, elConfigsSpring, resizerConfigsSpring})

    return useDragReactGesture(({ offset, down }) => {
            const newElPosition = {x: offset[0], y: offset[1]}

            move(newElPosition)

            updateElement(id, newElPosition)
        
            toogleDragging(down)
        }, {
        from: [
            elConfigsSpring.x.get(),
            elConfigsSpring.y.get()
        ]
    })
}
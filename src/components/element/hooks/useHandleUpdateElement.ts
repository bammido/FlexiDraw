import { useEffect } from "react";
import { ElApi, IElConfigsSpring, useBoardContext } from "../../../context/BoardContext";
import { SpringRef } from "@react-spring/web";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import useSetElApi from "./useSetElApi";
import { useElementsConfigsContext } from "../../../context/ElementsConfigsContext";

interface IUseHandleUpdateElementProps {
    elApi: ElApi;
    elConfigsSpring: IElConfigsSpring;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    id: string;
}

export default function useHandleUpdateElement({elApi, elConfigsSpring, resizerApi, resizerConfigsSpring, id} : IUseHandleUpdateElementProps) {
    const {selectedElement, selectedElementConfigs} = useBoardContext()

    const { move, resize, changeBackgorundColor } = useSetElApi({elApi, resizerApi, elConfigsSpring, resizerConfigsSpring})
    const { resinzingScale } = useElementsConfigsContext()

    useEffect(() => {
        if(selectedElement === id && selectedElementConfigs) {
            if(selectedElementConfigs.x.toFixed(2) !== elConfigsSpring.x.get().toFixed(2) ||
                selectedElementConfigs.y.toFixed(2) !== elConfigsSpring.y.get().toFixed(2)) {
                
                const newPosition = {
                    x: selectedElementConfigs.x,
                    y: selectedElementConfigs.y
                }

                move(newPosition)
            }

            if(selectedElementConfigs.width.toFixed(2) !== elConfigsSpring.width.get().toFixed(2) ||
                selectedElementConfigs.height.toFixed(2) !== elConfigsSpring.height.get().toFixed(2)) {
                
                const newElSize = { width: selectedElementConfigs.width, height: selectedElementConfigs.height}
                const newResizerSize = { 
                    resizerWidth: selectedElementConfigs.width * resinzingScale,
                    resizerHeight: selectedElementConfigs.height * resinzingScale
                }
                
                resize(newElSize, newResizerSize)
            }

            if(selectedElementConfigs.backgroundColor !== elConfigsSpring.backgroundColor.get()) {
                changeBackgorundColor(selectedElementConfigs.backgroundColor)
            }
        }
    }, [selectedElementConfigs])
}
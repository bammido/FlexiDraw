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

    const { 
        move, 
        resize, 
        changeBackgorundColor, 
        changeBorderColor, 
        changeBorderWidth, 
        changeBorderRadius,
        changeBorderStyle,
        changeRotation
    } = useSetElApi({elApi, resizerApi, elConfigsSpring, resizerConfigsSpring})

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
                
                const newResizerWidth = (selectedElementConfigs.width + selectedElementConfigs.borderWidth * 2) * resinzingScale;
                const newResizerHeight = (selectedElementConfigs.height + selectedElementConfigs.borderWidth * 2) * resinzingScale;
                
                const newElSize = { width: selectedElementConfigs.width, height: selectedElementConfigs.height}
                const newResizerConfigs = { 
                    resizerWidth: newResizerWidth,
                    resizerHeight: newResizerHeight,
                    resizerX: elConfigsSpring.x.get() - (newResizerWidth - newElSize.width) / 2,
                    resizerY: elConfigsSpring.y.get() - (newResizerHeight - newElSize.height) / 2
                }
                
                resize(newElSize, newResizerConfigs)
            }

            if(selectedElementConfigs.backgroundColor !== elConfigsSpring.backgroundColor.get()) {
                changeBackgorundColor(selectedElementConfigs.backgroundColor)
            }

            if(selectedElementConfigs.borderColor !== elConfigsSpring.borderColor.get()) {
                changeBorderColor(selectedElementConfigs.borderColor)
            }

            if(selectedElementConfigs.borderWidth !== elConfigsSpring.borderWidth.get()) {
                changeBorderWidth(selectedElementConfigs.borderWidth)
            }

            if(selectedElementConfigs.borderRadius !== elConfigsSpring.borderRadius.get()) {
                changeBorderRadius(selectedElementConfigs.borderRadius)
            }
            
            if(selectedElementConfigs.borderStyle !== elConfigsSpring.borderStyle.get()) {
                changeBorderStyle(selectedElementConfigs.borderStyle)
            }
            
            if(selectedElementConfigs.rotation !== elConfigsSpring.rotation.get()) {
                changeRotation(selectedElementConfigs.rotation)
            }
        }
    }, [selectedElementConfigs])
}
import { SpringRef } from "@react-spring/web";
import { BorderStyle, ElApi, IElConfigsSpring } from "../../../context/BoardContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import isAValidCSSColor from "../../../helpers/isAValidCSSColor";
import { useElementsConfigsContext } from "../../../context/ElementsConfigsContext";

interface IUseMoveElementProps {
    elApi: ElApi;
    resizerApi: SpringRef<IResizerConfigs>;
    resizerConfigsSpring: IResizerConfigsSpring;
    elConfigsSpring: IElConfigsSpring;
}

interface INewElmentPosition {
    x: number;
    y: number;
}

interface INewResizerPosition {
    resizerX: number;
    resizerY: number;
}

interface INewElementSize {
    width: number;
    height: number;
}

// type newElConfigs = (INewElementSize & INewElmentPosition) | INewElmentPosition | INewElementSize

interface INewResizerSize {
    resizerWidth: number;
    resizerHeight: number;
}

export default function useSetElApi({elApi, resizerApi, resizerConfigsSpring, elConfigsSpring}: IUseMoveElementProps) {
    const {resinzingScale} = useElementsConfigsContext()
    
    function move(newElPosition: INewElmentPosition) {
        const newResizerPosition: INewResizerPosition = {
            resizerX: newElPosition.x - (resizerConfigsSpring.resizerWidth.get() - (elConfigsSpring.width.get() + elConfigsSpring.borderWidth.get() * 2))/ 2,
            resizerY: newElPosition.y - (resizerConfigsSpring.resizerHeight.get() - (elConfigsSpring.height.get() + elConfigsSpring.borderWidth.get() * 2))/ 2
        }
        elApi.set(newElPosition);
        resizerApi.set(newResizerPosition)
    }

    function resize(newElConfigs: INewElementSize, newResizerSize: INewResizerSize) {
        elApi.set(newElConfigs)
        resizerApi.set({...newResizerSize})
    }

    function changeBackgorundColor(newColor: string) {
        const isValidColor = isAValidCSSColor(newColor.toLowerCase())

        if(isValidColor) {
            elApi.start({backgroundColor: newColor})
        }
    }
    
    function changeBorderColor(newColor: string) {
        const isValidColor = isAValidCSSColor(newColor.toLowerCase())

        if(isValidColor) {
            elApi.start({borderColor: newColor})
        }
    }
    
    function changeBorderWidth(newBorderWidth: number) {

        const newResizerWidth = (elConfigsSpring.width.get() + newBorderWidth * 2) * resinzingScale;
        const newResizerHeight = (elConfigsSpring.height.get() + newBorderWidth * 2) * resinzingScale;

        elApi.start({borderWidth: newBorderWidth})
        resizerApi.start({
            resizerX: elConfigsSpring.x.get() - (newResizerWidth - (elConfigsSpring.width.get() + newBorderWidth * 2))/2,
            resizerY: elConfigsSpring.y.get() - (newResizerHeight - (elConfigsSpring.height.get() + newBorderWidth * 2))/2,
            resizerWidth: newResizerWidth,
            resizerHeight: newResizerHeight
        })
    }

    function changeBorderRadius(newBorderRadius: number) {
        elApi.start({borderRadius: newBorderRadius})
    }
    
    function changeBorderStyle(newBorderStyle: BorderStyle) {
        elApi.start({borderStyle: newBorderStyle})
    }
    
    function changeRotation(newRotation: number) {
        elApi.start({rotation: newRotation})
    }

    return { 
        move, 
        resize, 
        changeBackgorundColor, 
        changeBorderColor, 
        changeBorderWidth, 
        changeBorderRadius, 
        changeBorderStyle,
        changeRotation
    }
}
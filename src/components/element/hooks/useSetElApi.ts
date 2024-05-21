import { SpringRef } from "@react-spring/web";
import { ElApi, IElConfigsSpring } from "../../../context/BoardContext";
import { IResizerConfigs, IResizerConfigsSpring } from "..";
import isAValidCSSColor from "../../../helpers/isAValidCSSColor";

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

type newElConfigs = (INewElementSize & INewElmentPosition) | INewElmentPosition | INewElementSize

interface INewResizerSize {
    resizerWidth: number;
    resizerHeight: number;
}

export default function useSetElApi({elApi, resizerApi, resizerConfigsSpring, elConfigsSpring}: IUseMoveElementProps) {
    function move(newElPosition: INewElmentPosition) {
        const newResizerPosition: INewResizerPosition = {
            resizerX: newElPosition.x - (resizerConfigsSpring.resizerWidth.get() - elConfigsSpring.width.get())/ 2,
            resizerY: newElPosition.y - (resizerConfigsSpring.resizerHeight.get() - elConfigsSpring.height.get())/ 2
        }
        elApi.set(newElPosition);
        resizerApi.set(newResizerPosition)
    }

    function resize(newElConfigs: newElConfigs, newResizerSize: INewResizerSize) {
        elApi.set(newElConfigs)
        resizerApi.set(newResizerSize)
    }

    function changeBackgorundColor(newColor: string) {
        const isValidColor = isAValidCSSColor(newColor.toLowerCase())

        if(isValidColor) {
            elApi.start({backgroundColor: newColor})
        }
    }

    return { move, resize, changeBackgorundColor }
}
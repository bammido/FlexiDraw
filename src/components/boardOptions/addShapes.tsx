import generateId from "../../helpers/generateId"
import { IElProps, IElementOnboard, useBoardContext } from "../../context/BoardContext"
import Square from "../square"
import PopOver from "../popover"
import { useRef, useState } from "react"
import useOutsideClick from "../../hooks/useOutsideClick"
import { AddShapesContainer, AddShapesPopOver, BoardOptionButton } from "./styles"

import { FaShapes } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { FaSquareFull } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

export default function AddShapes() {
    const [showPopOver, setShowPOpOver] = useState(false)

    const { addElement } = useBoardContext()

    function addSquare() {
      const newSquare: IElementOnboard<IElProps> = {
        id: generateId(),
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderColor: 'black',
        El: Square
      }
      addElement(newSquare)
    }

    const popupRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick({ref: popupRef, callback: () => setShowPOpOver(false)})

    return <AddShapesContainer ref={popupRef} >
        <BoardOptionButton onClick={() => setShowPOpOver(prev => !prev)}> <FaShapes /> shapes </BoardOptionButton>
        <PopOver show={showPopOver} height={300} >
            <AddShapesPopOver>
                <FaSquareFull onClick={addSquare} title="quadrado" />
                <FaCircle title="circulo" />
                <IoTriangle title="triângulo" />
            </AddShapesPopOver>
        </PopOver>
    </AddShapesContainer>
}
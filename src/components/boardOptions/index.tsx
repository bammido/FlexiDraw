import { useBoardContext } from "../../context/BoardContext";
import AddShapes from "./addShapes";
import { BoardOptionButton, BoardOptionsContainer } from "./styles";
import { RiEraserLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function BoardOptions() {
  const boardOptionsRef = useRef<HTMLDivElement | null>(null)

  const {resetBoard, deleteSelectedElement, selectedElement, setBoardOptionsRef} = useBoardContext()
 
  useEffect(() => {
    setBoardOptionsRef(boardOptionsRef)
  }, [boardOptionsRef])

  return <BoardOptionsContainer ref={boardOptionsRef}>
    <AddShapes />
    <BoardOptionButton onClick={resetBoard}><RiEraserLine />resetar</BoardOptionButton>
    <BoardOptionButton onClick={deleteSelectedElement} 
    disabled={!selectedElement}>
      <FaTrash />remover
    </BoardOptionButton>
  </BoardOptionsContainer>
}
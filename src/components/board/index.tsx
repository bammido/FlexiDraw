import { useEffect } from "react";
import { useBoardContext } from "../../context/BoardContext";
import Square from "../square";
import { BoardDiv } from "./styles";

export default function Board({boardRef}: {boardRef: React.MutableRefObject<null | HTMLDivElement>}) {
  const { elementsOnBoard, setSize } = useBoardContext()

  useEffect(() => {
    boardRef.current && setSize({width: boardRef.current.clientWidth, height: boardRef.current.clientHeight})

}, [boardRef])

    return <BoardDiv>
      {elementsOnBoard.map(el => <Square key={el.id} />)}
  </BoardDiv>
}
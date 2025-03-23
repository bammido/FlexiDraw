import { useEffect } from "react";
import { useBoardContext } from "../../context/BoardContext";
import { BoardDiv, BoardSection } from "./styles";
import BoardElement from "../element";

export default function Board({boardRef}: {boardRef: React.MutableRefObject<null | HTMLDivElement>}) {
  const { elementsOnBoard, setSize } = useBoardContext()

  useEffect(() => {
    boardRef.current && setSize({width: boardRef.current.clientWidth, height: boardRef.current.clientHeight})
  }, [boardRef])

  return <BoardSection>
    <BoardDiv>
      {elementsOnBoard.map(el => <BoardElement {...el} key={el.id} />)}
    </BoardDiv>
  </BoardSection>
}
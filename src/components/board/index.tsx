import { useEffect } from "react";
import { useBoardContext } from "../../context/BoardContext";
import { BoardDiv } from "./styles";
import BoardElement from "../element";

export default function Board({boardRef}: {boardRef: React.MutableRefObject<null | HTMLDivElement>}) {
  const { elementsOnBoard, setSize } = useBoardContext()

  useEffect(() => {
    boardRef.current && setSize({width: boardRef.current.clientWidth, height: boardRef.current.clientHeight})
  }, [boardRef])

  return <div style={{ padding: "2rem", flexGrow: 1, display: 'flex'}}>
    <BoardDiv>
      {elementsOnBoard.map(el => <BoardElement {...el} key={el.id} />)}
    </BoardDiv>
  </div>
}
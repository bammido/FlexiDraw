import { useBoardContext } from "../../context/BoardContext";
import AddShapes from "./addShapes";
import { BoardOptionButton, BoardOptionsContainer } from "./styles";
import { RiEraserLine } from "react-icons/ri";

export default function BoardOptions() {

  const {resetBoard} = useBoardContext()
   
  return <BoardOptionsContainer>
    <AddShapes />
    <BoardOptionButton onClick={resetBoard}><RiEraserLine />reset</BoardOptionButton>
  </BoardOptionsContainer>
}
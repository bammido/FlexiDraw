import { IElProps, IElementOnboard, useBoardContext } from "../../context/BoardContext"
import generateId from "../../helpers/generateId";
import Square from "../square";

export default function BoardOptions() {
    const { addElement } = useBoardContext()

    function addSquare() {
      const newSquare: IElementOnboard<IElProps> = {
        id: generateId(),
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        backgroundColor: 'black',
        borderColor: 'black',
        El: Square
      }
      addElement(newSquare)
    }

    return <div>
    <button onClick={addSquare}>quadrado</button>
  </div>
}
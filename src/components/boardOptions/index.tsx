import { useBoardContext } from "../../context/BoardContext"
import { v4 as uuidv4 } from 'uuid';

export default function BoardOptions() {
    const { setElementsOnBoard } = useBoardContext()

    return <div>
    <button onClick={() => setElementsOnBoard(prev => [...prev, {id: uuidv4(), type: 'square'}])}>quadrado</button>
  </div>
}
import { useRef } from 'react';
import Board from './components/board';
import BoardOptions from './components/boardOptions';
import { BoardContextProvider } from './context/BoardContext';
import { ElementsConfigsContext } from './context/ElementsConfigsContext';

function App() {
  const boardRef = useRef<HTMLDivElement | null>(null)

  return (
    <div style={{width: "100vw", height: "100vh", display: "flex"}}>
      <BoardContextProvider>
        <ElementsConfigsContext>
          <div style={{display: "flex", flexDirection: "column", padding: "3rem", flexGrow: 1}}>
            <BoardOptions />
            
            <div ref={boardRef} style={{display: 'flex', flexGrow: 1 }}>
                <Board boardRef={boardRef} />
            </div>
          </div>
        </ElementsConfigsContext>
      </BoardContextProvider>
    </div>
  )
}

export default App

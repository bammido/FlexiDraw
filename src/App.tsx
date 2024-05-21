import { useRef } from 'react';
import Board from './components/board';
import BoardOptions from './components/boardOptions';
import { BoardContextProvider } from './context/BoardContext';
import { ElementsConfigsContext } from './context/ElementsConfigsContext';
import ElementOptions from './components/elementOptions/ElementOptions';

function App() {
  const boardRef = useRef<HTMLDivElement | null>(null)

  return (
    <div style={{width: "100vw", height: "100vh", display: "flex"}}>
      <BoardContextProvider>
        <ElementsConfigsContext>
          <div style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
            <BoardOptions />
            
            <div ref={boardRef} style={{display: 'flex', flexGrow: 1, padding: '2rem', paddingLeft: 0, gap:'2rem' }}>
                <ElementOptions />
                <Board boardRef={boardRef} />
            </div>
          </div>
        </ElementsConfigsContext>
      </BoardContextProvider>
    </div>
  )
}

export default App

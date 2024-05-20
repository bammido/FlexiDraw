import { animated } from "@react-spring/web";
import { IElProps } from "../../context/BoardContext";

export default function Square({ x, y, width, height, dragging, toggleResinzing, binds: { dragBind }}: IElProps) {

    return (
      <animated.div
      onClick={() => toggleResinzing(true)}
      style={{
          touchAction: 'none',
          x,
          y,
          backgroundColor: "black",
          width: width,
          height: height,
          position: 'absolute',
          cursor: dragging ? 'move' : 'default'
      }}
      {...dragBind()}
  />
    );
}
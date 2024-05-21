import { animated } from "@react-spring/web";
import { IElProps } from "../../context/BoardContext";

export default function Square({ x, y, width, height, backgroundColor, dragging, handleClickElement, binds: { dragBind }}: IElProps) {

    return (
      <animated.div
      onClick={handleClickElement}
      style={{
          touchAction: 'none',
          x,
          y,
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          position: 'absolute',
          cursor: dragging ? 'move' : 'default'
      }}
      {...dragBind()}
  />
    );
}
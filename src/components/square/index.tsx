import { animated } from "@react-spring/web";
import { IElProps } from "../../context/BoardContext";

export default function Square({ rotation, x, y, width, height, backgroundColor, borderStyle, borderWidth, borderRadius, borderColor, dragging, handleClickElement, binds: { dragBind }}: IElProps) {

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
          cursor: dragging ? 'move' : 'default',
          rotate: rotation,
          borderStyle,
          borderRadius,
          borderWidth,
          borderColor
      }}
      {...dragBind()}
  />
    );
}
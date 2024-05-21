import { PopOverDiv } from "./styles";

interface IPopOverProps {
    show: boolean;
    height: number;
    children: React.ReactNode
}

export default function PopOver({children, ...props}: IPopOverProps) {
    return <PopOverDiv {...props}>
        {children}
    </PopOverDiv>
}
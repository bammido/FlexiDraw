import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ElementConfig, ElementConfigsContainer, ElementOptionsContainer, ElementsConfigsInput, ExpandElementOptions } from "./styles";
import { LuArrowBigRightDash } from "react-icons/lu";
import { useBoardContext } from "../../context/BoardContext";
import { useElementsConfigsContext } from "../../context/ElementsConfigsContext";

export default function ElementOptions(){
    const elementOptionsRef = useRef<HTMLDivElement | null>(null)
    const {selectedElementConfigs, selectedElement, updateElement} = useBoardContext()

    const [expanded, setExpanded] = useState(false)
    const [configs, setConfigs] = useState(()=> selectedElementConfigs? {
        ...selectedElementConfigs,
        x: Number(selectedElementConfigs.x.toFixed(2)),
        y: Number(selectedElementConfigs.y.toFixed(2)),
        width: Number(selectedElementConfigs.width.toFixed(2)),
        height: Number(selectedElementConfigs.height.toFixed(2)),
    } : selectedElementConfigs)
    const [updatedConfig, setUpdatedConfig] = useState<{name: string, value: string | number}>({name: '', value: ''})

    const {setElementOptionsRef} = useElementsConfigsContext()

    useEffect(() => {
        setElementOptionsRef(elementOptionsRef)
    }, [elementOptionsRef])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target

        let newValue: undefined | number | string = value;

        if(name === 'x' || name === 'y' || name === 'width' || name === "height") {
            const numbers = value.match(/\d+(\.\d+)?/g);
            newValue = numbers? Number(numbers.join('')) : 0;
        }

        setUpdatedConfig({name: name, value: newValue})
    }

    useEffect(() => {
        if(updatedConfig){
            updateElement(selectedElement, {[updatedConfig.name]: updatedConfig.value})
        } 
    }, [updatedConfig])

    useEffect(() => {
        if(selectedElementConfigs) {
            setConfigs(()=> selectedElementConfigs? {
                ...selectedElementConfigs,
                x: Number(selectedElementConfigs.x.toFixed(2)),
                y: Number(selectedElementConfigs.y.toFixed(2)),
                width: Number(selectedElementConfigs.width.toFixed(2)),
                height: Number(selectedElementConfigs.height.toFixed(2)),
            } : selectedElementConfigs)
        }
    }, [selectedElementConfigs])

    return <ElementOptionsContainer expanded={expanded} ref={elementOptionsRef}>
        <ExpandElementOptions expanded={expanded}>
            <LuArrowBigRightDash onClick={() => setExpanded(prev => !prev)} />
        </ExpandElementOptions>
        {selectedElementConfigs && configs && <ElementConfigsContainer>
            <ElementConfig>
                <label htmlFor="x">X:</label> 
                <ElementsConfigsInput 
                    name="x" 
                    id="x"
                    onChange={handleChange} 
                    value={configs?.x}
                />
            </ElementConfig>
            <ElementConfig>
                <label>Y:</label>
                <ElementsConfigsInput 
                    name="y"
                    id="y"
                    onChange={handleChange} 
                    value={configs.y}
                />
            </ElementConfig>
            <ElementConfig>
                <label>width:</label>
                <ElementsConfigsInput 
                    name="width"
                    id="width"
                    onChange={handleChange} 
                    value={configs.width}
                />
            </ElementConfig>
            <ElementConfig>
                <label>height:</label>
                <ElementsConfigsInput 
                    name="height"
                    id="height"
                    onChange={handleChange} 
                    value={configs.height}
                />
            </ElementConfig>
            <ElementConfig>
                <label>backgroundColor:</label>
                <ElementsConfigsInput 
                    name="backgroundColor"
                    id="backgroundColor"
                    onChange={handleChange} 
                    value={configs.backgroundColor}
                />
            </ElementConfig>
        </ElementConfigsContainer>}
    </ElementOptionsContainer>
}
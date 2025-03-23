import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ElementBorderStyleExample, ElementBorderStyleExampleContainer, ElementConfig, ElementConfigSection, ElementConfigSectionAux, ElementConfigsContainer, ElementOptionsContainer, ElementsConfigsInput, ElementsConfigsInputSecundary, ExpandElementOptions } from "./styles";
import { LuArrowBigRightDash } from "react-icons/lu";
import { useBoardContext, BorderStyle } from "../../context/BoardContext";
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

        if(name === 'x' || name === 'y' || name === 'width' || name === "height" || name === "borderWidth"
            || name === 'borderRadius' || name === 'rotation'
        ) {
            const numbers = value.match(/\d+(\.\d+)?/g);
            newValue = numbers? Number(numbers.join('')) : 0;
        }

        if((name === "borderWidth" || name === 'borderRadius') && (newValue as number < 0 || newValue as number > 20)) {
            return
        }

        setUpdatedConfig({name: name, value: newValue})
    }

    function handleChangeBorderStyle(newStyle: BorderStyle) {
        setUpdatedConfig({name: 'borderStyle', value: newStyle})
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
        <div style={{ width: '100%', overflow: "hidden", flexGrow: 1}}>
            {selectedElementConfigs && configs && <ElementConfigsContainer>
                <ElementConfigSectionAux>
                    <h2>Dimensões</h2>
                    <ElementConfigSection>
                        <ElementConfig>
                            <label htmlFor="x">X</label> 
                            <ElementsConfigsInput 
                                name="x" 
                                id="x"
                                onChange={handleChange} 
                                value={configs?.x}
                            />
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="y">Y</label>
                            <ElementsConfigsInput 
                                name="y"
                                id="y"
                                onChange={handleChange} 
                                value={configs.y}
                            />
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="width">Comprimento</label>
                            <ElementsConfigsInput 
                                name="width"
                                id="width"
                                onChange={handleChange} 
                                value={configs.width}
                            />
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="height">Altura</label>
                            <ElementsConfigsInput 
                                name="height"
                                id="height"
                                onChange={handleChange} 
                                value={configs.height}
                            />
                        </ElementConfig>
                        {/* <ElementConfig>
                            <label htmlFor="height">Rotação</label>
                            <ElementsConfigsInput 
                                name="rotation"
                                id="rotation"
                                onChange={handleChange} 
                                value={configs.rotation}
                            />
                        </ElementConfig> */}
                    </ElementConfigSection>
                </ElementConfigSectionAux>
                <ElementConfigSectionAux>
                    <h2>Estilo</h2>
                    <ElementConfigSection>
                        <ElementConfig>
                            <label htmlFor="backgroundColor">Cor (hex ou css colors)</label>
                            <ElementsConfigsInput 
                                name="backgroundColor"
                                id="backgroundColor"
                                onChange={handleChange} 
                                value={configs.backgroundColor}
                            />
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="borderColor">Cor da borda (hex ou css colors)</label>
                            <ElementsConfigsInput 
                                name="borderColor"
                                id="borderColor"
                                onChange={handleChange} 
                                value={configs.borderColor}
                            />
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="borderWidth">Tamanho da borda</label>
                            <div style={{ display: "flex", alignItems: "center", gap: '1rem'}}>
                                <ElementsConfigsInput
                                    type="range"
                                    min="0" max="20"
                                    name="borderWidth"
                                    id="borderWidth"
                                    onChange={handleChange} 
                                    value={configs.borderWidth}
                                />
                                <ElementsConfigsInputSecundary 
                                    name="borderWidth"
                                    id="borderWidth"
                                    onChange={handleChange} 
                                    value={configs.borderWidth}
                                />
                            </div>
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="borderWidth">Arredondamento da borda</label>
                            <div style={{ display: "flex", alignItems: "center", gap: '1rem'}}>
                                <ElementsConfigsInput
                                    type="range"
                                    min="0" max="20"
                                    name="borderRadius"
                                    id="borderRadius"
                                    onChange={handleChange} 
                                    value={configs.borderRadius}
                                />
                                <ElementsConfigsInputSecundary 
                                    name="borderRadius"
                                    id="borderRadius"
                                    onChange={handleChange} 
                                    value={configs.borderRadius}
                                />
                            </div>
                        </ElementConfig>
                        <ElementConfig>
                            <label htmlFor="borderWidth">Estilo da borda</label>
                            <ElementBorderStyleExampleContainer
                                id="borderStyle"
                                name="borderStyle"
                                onClick={() => handleChangeBorderStyle('solid')}
                            >
                                <ElementBorderStyleExample 
                                    borderStyle="solid"
                                    borderColor={configs.borderColor}
                                />
                            </ElementBorderStyleExampleContainer>
                            <ElementBorderStyleExampleContainer
                                id="borderStyle"
                                name="borderStyle"
                                onClick={() => handleChangeBorderStyle('dotted')}
                            >
                                <ElementBorderStyleExample 
                                    borderStyle="dotted"
                                    borderColor={configs.borderColor}
                                />
                            </ElementBorderStyleExampleContainer>
                            <ElementBorderStyleExampleContainer
                                id="borderStyle"
                                name="borderStyle"
                                onClick={() => handleChangeBorderStyle('dashed')}
                            >
                                <ElementBorderStyleExample 
                                    borderStyle="dashed"
                                    borderColor={configs.borderColor}
                                />
                            </ElementBorderStyleExampleContainer>
                            <ElementBorderStyleExampleContainer
                                id="borderStyle"
                                name="borderStyle"
                                onClick={() => handleChangeBorderStyle('double')}
                            >
                                <ElementBorderStyleExample 
                                    borderStyle="double"
                                    borderColor={configs.borderColor}
                                />
                            </ElementBorderStyleExampleContainer>
                        </ElementConfig>
                    </ElementConfigSection>
                </ElementConfigSectionAux>
            </ElementConfigsContainer>}
        </div>

    </ElementOptionsContainer>
}
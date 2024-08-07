import classNames from "classnames";
import { SliderProps } from "../types/dash.types";
import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";

const MultiRangeSlider:React.FC<SliderProps> = ({min, max, onChange}) => {
    const [ minVal, setMinVal ] = useState(min);
    const [ maxVal, setMaxVal ] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null); 
    const maxValRef = useRef<HTMLInputElement>(null); 
    const range = useRef<HTMLDivElement>(null); 

    const getPercentage = useCallback((value: number) => {
        Math.round((value - min) / (max - min)) * 100
    }, [max, min]); 

    useEffect(() => {
        if(maxValRef.current) {
            const maxValue = +maxValRef.current.value
            
            const minPercent: number = ((minVal - min) * 100 / (max - min)); 
            const maxPercent : number = ((maxValue - min) * 100 / (max - min));

            if(range.current) {
                range.current.style.left = `${minPercent}%`
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
           
        }
    }, [minVal, getPercentage]); 

    useEffect(() => {
        if(minValRef.current) {
            const minValue = +minValRef.current.value
            
            const minPercent: number = ((minValue - min) * 100 / (max - min)); 
            const maxPercent : number = ((maxVal - min) * 100 / (max - min));

            if(range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
            
        }
    }, [maxVal, getPercentage]); 

    useEffect(() => {
        onChange({ min: minVal, max: maxVal })
    }, [minVal, maxVal, onChange])
    return (
        <>
            <input type="range" 
                min={min} max={max}
                value={minVal} ref={minValRef}
                onChange = {(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(+event.target.value, maxVal - 1); 
                    setMinVal(value); 
                    event.target.value = value.toString(); 
                }}
                className={classNames("thumb thumb--zindex-3", {
                    "thumb--zindex-5" : minVal > max - 100 
                })}
                />
            <input type="range" 
                min={min} max={max}
                value={maxVal} ref={maxValRef}
                onChange = {(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.max(+event.target.value, minVal + 1); 
                    setMaxVal(value); 
                    event.target.value = value.toString(); 
                }}
                className="thumb thumb--zindex-4"/>
            
            <div className="slider">
                <div className="slider__track"></div>
                <div ref={range} className="slider__range"></div>
                <div className="slider__left-value">${minVal}</div>
                <div className="slider__right-value">${maxVal}</div>
            </div>
        </>
    )
}

export default MultiRangeSlider
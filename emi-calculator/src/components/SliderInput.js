import React from "react";
import { numberWithCommas } from "../utils/config";


const SliderInput = ({
    title,
    state,
    min,
    max,
    onchange,
    underlinedTitle,
    labelMin,
    labelMax
}) => {
    return (
        <>
            <span>{title}</span>
            {state > 0 && (
                <span>{underlinedTitle}</span>
            )}
            <div>
                <input
                    type="range"
                    value={state}
                    min={min}
                    max={max}
                    onchange={onchange}
                    className="slider"
                />
                <div className="labels">
                    <label>{labelMin ?? numberWithCommas(min)}</label>
                    <b>{numberWithCommas(state)}</b>
                    <label>{labelMax ?? numberWithCommas(max)}</label>
                </div>
            </div>
        </>
    )
}

export default SliderInput;
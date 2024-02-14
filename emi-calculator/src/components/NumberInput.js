import React from 'react'

const NumberInput = ({ title, state, setState }) => {
    return (
        <>
            <span>{title}</span>
            <input
                type='number'
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={title}
            />
        </>
    )
}

export default NumberInput
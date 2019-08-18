
import React from 'react';
export function Btn(props){
    const {label, onClick} = props
    return (
        <div className={'btn'} onClick={onClick}>
            {label}
        </div>
    )

}
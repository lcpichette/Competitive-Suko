'use client'

import React from "react";

interface Props {
    bgColor: string;
    selectedValue: number;
}

export default function Cell({ bgColor, selectedValue }: Props) {
    const [value, setValue] = React.useState(0);
    return (
        <button type={"button"} className={`h-14 w-14 ${bgColor}`} onClick={() => setValue(selectedValue)}>
            {value || ''}
        </button>
    )
}
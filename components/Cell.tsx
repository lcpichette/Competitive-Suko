'use client'

import React from "react";
import {BoardMeta} from "@/components/Board";

interface Props {
    bgColor: string;
    selectedValue: number;
    boardMeta: BoardMeta;
    setBoardMeta: any;
    cellIndex: number;
}

export default function Cell({ bgColor, selectedValue, boardMeta, setBoardMeta, cellIndex }: Props) {
    const [value, setValue] = React.useState(0);

    function updateValue() {
        setValue(selectedValue);
        boardMeta.cellValues[cellIndex] = selectedValue;
        setBoardMeta({
            ...boardMeta,
            valueUpdates: boardMeta.valueUpdates + 1,
            cellValues: [...boardMeta.cellValues],
        })
    }

    return (
        <button type={"button"} className={`h-14 w-14 ${bgColor}`} onClick={() => updateValue()}>
            {value || ''}
        </button>
    )
}

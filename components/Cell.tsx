'use client'

import React from "react";
import {BoardMeta} from "@/components/Board";

interface Props {
    bgColor: string;
    selectedValue: number;
    boardMeta: BoardMeta;
    setBoardMetaAction: React.Dispatch<React.SetStateAction<BoardMeta | undefined>>;
    cellIndex: number;
}

export default function Cell({ bgColor, selectedValue, boardMeta, setBoardMetaAction, cellIndex }: Props) {
    const [value, setValue] = React.useState(0);

    function updateValue() {
        setValue(selectedValue);
        boardMeta.cellValues[cellIndex] = selectedValue;
        setBoardMetaAction({
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

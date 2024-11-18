'use client'

import Cell from '@/components/Cell';
import Chance from 'chance';
import React, {useEffect} from "react";
const chance = new Chance();

interface BoardMeta {
    cols: number,
    rows: number,
    colors: string[],
    colorKeys: React.JSX.Element[]
}

export default function Board({ selectedValue }: any) {
    const [boardMeta, setBoardMeta] = React.useState<BoardMeta | undefined>();
    useEffect(() => {
        generateBoardMeta(setBoardMeta);
    }, [])
    return (
        <div className={"block"}>
            {boardMeta
                && <>
                    <div className={"flex gap-2 my-4"}>
                        {boardMeta.colorKeys}
                    </div>
                    <hr />
                    <div
                        className={`grid gap-2 max-w-fit min-w-fit`}
                        style={{
                            gridTemplateColumns: `repeat(${boardMeta.cols}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${boardMeta.rows}, auto)`,
                        }}
                    >
                        {Array.from({length: boardMeta.cols * boardMeta.rows}).map((_, index) => (
                            <Cell bgColor={boardMeta.colors[index]} key={index} selectedValue={selectedValue}/>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

function generateBoardMeta(setBoardMeta: any) {
    const PREDEFINED_COLORS = ['bg-[#992522]/80', 'bg-[#251D7D]/80', 'bg-[#218524]/80', 'bg-[#229699]/80','bg-[#852182]/80'];
    const rows = chance.weighted([3,4,5], [80,15,5]);
    const cols = chance.weighted([3,4,5], [80,15,5]);
    const numCells = rows * cols;
    const numColorWeights = numCells <= 9 ? [15,85,0,0] : numCells <= 12 ? [2,70,20,8] : numCells <= 16 ? [1,59,25,15] : [0.5,35,45,19.5];
    const numColors = chance.weighted([2,3,4,5], numColorWeights);

    const colors: string[] = [];
    const colorKeys: React.JSX.Element[] = [];
    for (let i = 0; i < numCells; i++) {
        const colorWeights: number[] = [];
        PREDEFINED_COLORS.slice(0,numColors).forEach((color, j) => {
            const NUM_Jth_COLOR: number = (colors.filter((color) => color === PREDEFINED_COLORS[j]) || []).length || 1;
            const Jth_ODDS: number = 1 - (NUM_Jth_COLOR / numCells);
            colorWeights.push(Jth_ODDS);
        });
        const colorIndex = chance.weighted([0,1,2,3,4].slice(0,numColors), colorWeights);
        colors.push(PREDEFINED_COLORS[colorIndex]);
    }
    PREDEFINED_COLORS.slice(0,numColors).forEach((_, i) => {
        const color = PREDEFINED_COLORS[i];
        const numOfIthColor = colors.filter((color) => color === PREDEFINED_COLORS[i]).length;
        const colorSum = Math.floor((Math.random() * (numOfIthColor * 9)) + numOfIthColor);
        colorKeys.push(<div key={i} className={`h-10 w-10 ${color} flex justify-center items-center`}>{colorSum}</div>);
    });
    setBoardMeta({
        cols,
        rows,
        colors,
        colorKeys
    })
}

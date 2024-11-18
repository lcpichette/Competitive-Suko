'use client'

import Chance from 'chance';
import React, {useEffect} from "react";
const chance = new Chance();

interface BoardMeta {
    cols: number,
    rows: number,
    colors: string[],
    colorKeys: React.JSX.Element[],
    circleValues: (number | null)[] // Allow for possible null values if no circle
}

export default function Board({ selectedValue }: any) {
    const [boardMeta, setBoardMeta] = React.useState<BoardMeta | undefined>();
    useEffect(() => {
        generateBoardMeta(setBoardMeta);
    }, []);
    return (
        <div className="block">
            {boardMeta && (
                <>
                    <div className="flex gap-2 my-4">{boardMeta.colorKeys}</div>
                    <hr />
                    <div
                        className={`grid gap-2 max-w-fit min-w-fit`}
                        style={{
                            gridTemplateColumns: `repeat(${boardMeta.cols}, 1fr)`,
                            gridTemplateRows: `repeat(${boardMeta.rows}, 1fr)`,
                        }}
                    >
                        {Array.from({ length: boardMeta.cols * boardMeta.rows }).map((_, index) => {
                            const col = index % boardMeta.cols;
                            const row = Math.floor(index / boardMeta.cols);
                            const showCircle = (col < boardMeta.cols - 1) && (row < boardMeta.rows - 1);
                            const circleIndex = (row * (boardMeta.cols - 1)) + col;
                            return (
                                <div key={index} className="relative h-16 w-16">
                                    <Cell
                                        bgColor={boardMeta.colors[index]}
                                        selectedValue={selectedValue}
                                        className="relative h-full w-full"
                                    />
                                    {showCircle && boardMeta.circleValues[circleIndex] !== null && (
                                        <div
                                            className="absolute h-8 w-8 bg-white rounded-full shadow-md flex justify-center items-center z-20"
                                            /* (h-8 / 2) + (gap-2 / 2)*/
                                            style={{
                                                bottom: '-20px',
                                                right: '-20px',
                                            }}
                                        >
                                            {boardMeta.circleValues[circleIndex]}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

function Cell({ bgColor, selectedValue, className }: { bgColor: string; selectedValue: any; className?: string }) {
    return <div className={`${bgColor} ${className}`}></div>;
}

function generateBoardMeta(setBoardMeta: any) {
    const PREDEFINED_COLORS = ['bg-[#992522]/80', 'bg-[#251D7D]/80', 'bg-[#218524]/80', 'bg-[#229699]/80', 'bg-[#852182]/80'];
    const rows = chance.weighted([3, 4, 5], [80, 15, 5]);
    const cols = chance.weighted([3, 4, 5], [80, 15, 5]);
    const numCells = rows * cols;
    const numColorWeights = numCells <= 9 ? [15, 85, 0, 0] : numCells <= 12 ? [2, 70, 20, 8] : numCells <= 16 ? [1, 59, 25, 15] : [0.5, 35, 45, 19.5];
    const numColors = chance.weighted([2, 3, 4, 5], numColorWeights);

    const colors: string[] = [];
    const colorKeys: React.JSX.Element[] = [];
    for (let i = 0; i < numCells; i++) {
        const colorWeights: number[] = [];
        PREDEFINED_COLORS.slice(0, numColors).forEach((color, j) => {
            const colorCount = colors.filter(c => c === PREDEFINED_COLORS[j]).length;
            const odds = 1 - (colorCount / numCells);
            colorWeights.push(odds);
        });
        const colorIndex = chance.weighted([0, 1, 2, 3, 4].slice(0, numColors), colorWeights);
        colors.push(PREDEFINED_COLORS[colorIndex]);
    }
    PREDEFINED_COLORS.slice(0, numColors).forEach((_, i) => {
        const color = PREDEFINED_COLORS[i];
        const numOfColor = colors.filter(c => c === PREDEFINED_COLORS[i]).length;
        const colorSum = Math.floor(Math.random() * (numOfColor * 9) + numOfColor);
        colorKeys.push(<div key={i} className={`h-10 w-10 ${color} flex justify-center items-center`}>{colorSum}</div>);
    });

    // Generate circle values
    const circleValues: (number | null)[] = Array((cols - 1) * (rows - 1)).fill(null);
    for (let i = 0; i < circleValues.length; i++) {
        circleValues[i] = Math.floor(Math.random() * 36) + 4;
    }

    setBoardMeta({
        cols,
        rows,
        colors,
        colorKeys,
        circleValues,
    });
}
"use client";

import Chance from "chance";
import React, { useEffect } from "react";
import Cell from "@/components/Cell";
const chance = new Chance();

export interface BoardMeta {
  cols: number;
  rows: number;
  cellValues: number[];
  colors: string[];
  colorKeys: React.JSX.Element[];
  circleValues: (number | null)[];
  colorSums: Record<string, number>;
  valueUpdates: number;
}

interface Props {
  selectedValue: number;
}

export default function Board({ selectedValue }: Props) {
  const [boardMeta, setBoardMeta] = React.useState<BoardMeta | undefined>();

  useEffect(() => {
    generateBoardMeta(setBoardMeta);
  }, []);

  useEffect(() => {
    if (boardMeta) {
      checkSums(boardMeta);
    }
  }, [boardMeta]);

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
            {Array.from({ length: boardMeta.cols * boardMeta.rows }).map(
              (_, index) => {
                const col = index % boardMeta.cols;
                const row = Math.floor(index / boardMeta.cols);
                const showCircle =
                  col < boardMeta.cols - 1 && row < boardMeta.rows - 1;
                const circleIndex = row * (boardMeta.cols - 1) + col;
                return (
                  <div key={index} className="relative h-16 w-16">
                    <Cell
                      bgColor={boardMeta.colors[index]}
                      selectedValue={selectedValue}
                      boardMeta={boardMeta}
                      setBoardMetaAction={setBoardMeta}
                      cellIndex={index}
                    />
                    {showCircle &&
                      boardMeta.circleValues[circleIndex] !== null && (
                        <div
                          className="absolute h-8 w-8 bg-white rounded-full shadow-md flex justify-center items-center z-20"
                          style={{
                            bottom: "-18px",
                            right: "-18px",
                          }}
                        >
                          {boardMeta.circleValues[circleIndex]}
                        </div>
                      )}
                  </div>
                );
              },
            )}
          </div>
        </>
      )}
    </div>
  );
}

function generateBoardMeta(setBoardMeta: React.Dispatch<React.SetStateAction<BoardMeta | undefined>>) {
  const PREDEFINED_COLORS = [
    "bg-[#992522]/80",
    "bg-[#251D7D]/80",
    "bg-[#218524]/80",
    "bg-[#229699]/80",
    "bg-[#852182]/80",
  ];
  const rows = chance.weighted([3, 4, 5], [80, 15, 5]);
  const cols = chance.weighted([3, 4, 5], [80, 15, 5]);
  const numCells = rows * cols;
  const numColorWeights =
    numCells <= 9
      ? [15, 85, 0, 0]
      : numCells <= 12
        ? [2, 70, 20, 8]
        : numCells <= 16
          ? [1, 59, 25, 15]
          : [0.5, 35, 45, 19.5];
  const numColors = chance.weighted([2, 3, 4, 5], numColorWeights);

  const colors: string[] = [];
  const colorKeys: React.JSX.Element[] = [];
  const colorSums: Record<string, number> = {};
  PREDEFINED_COLORS.slice(0, numColors).forEach((color) => {
    colorSums[color] = 0;
  });

  for (let i = 0; i < numCells; i++) {
    const colorWeights: number[] = [];
    PREDEFINED_COLORS.slice(0, numColors).forEach((color, j) => {
      const colorCount = colors.filter(
        (c) => c === PREDEFINED_COLORS[j],
      ).length;
      const odds = 1 - colorCount / numCells;
      colorWeights.push(odds);
    });
    const colorIndex = chance.weighted(
      [0, 1, 2, 3, 4].slice(0, numColors),
      colorWeights,
    );
    const chosenColor = PREDEFINED_COLORS[colorIndex];
    colors.push(chosenColor);

    // Increment color sum with a random value
    colorSums[chosenColor] += Math.floor(Math.random() * 9) + 1;
  }

  PREDEFINED_COLORS.slice(0, numColors).forEach((_, i) => {
    const color = PREDEFINED_COLORS[i];
    colorKeys.push(
      <div
        key={i}
        className={`h-10 w-10 ${color} flex justify-center items-center`}
      >
        {colorSums[color]}
      </div>,
    );
  });

  // Generate circle values
  const circleValues: (number | null)[] = Array((cols - 1) * (rows - 1)).fill(
    null,
  );
  for (let i = 0; i < circleValues.length; i++) {
    circleValues[i] = Math.floor(Math.random() * 36) + 4;
  }
  const cellValues: number[] = Array(colors.length).fill(0);

  setBoardMeta({
    cols,
    rows,
    cellValues,
    colors,
    colorKeys,
    circleValues,
    colorSums,
    valueUpdates: 0,
  });
}

function checkSums(boardMeta: BoardMeta) {
  const { cols, colors, colorSums, circleValues, cellValues } = boardMeta;

  // Check color sums
  const calculatedColorSums: Record<string, number> = {};
  let i = 0;
  colors.forEach((color) => {
    if (isNaN(cellValues[i])) {
      calculatedColorSums[color] = 0;
    } else {
      if (!calculatedColorSums[color]) {
        calculatedColorSums[color] = cellValues[i];
      } else {
        calculatedColorSums[color] += cellValues[i];
      }
    }
    i++;
  });

  for (const color in calculatedColorSums) {
    if (calculatedColorSums[color] === colorSums[color]) {
      console.log(
        `Matched color sum for ${color}: ${calculatedColorSums[color]}`,
      );
    } else {
      console.log(
        `Mismatch color sum for ${color}: ${calculatedColorSums[color]} (expected: ${colorSums[color]})`,
      );
    }
  }

  // Check circle sums
  circleValues.forEach((value, index) => {
    if (value !== null) {
      const row = Math.floor(index / (cols - 1));
      const col = index % (cols - 1);
      const topLeftIndex = row * cols + col;
      const topRightIndex = topLeftIndex + 1;
      const bottomLeftIndex = topLeftIndex + cols;
      const bottomRightIndex = bottomLeftIndex + 1;

      const sum =
        cellValues[topLeftIndex] +
        cellValues[topRightIndex] +
        cellValues[bottomLeftIndex] +
        cellValues[bottomRightIndex];
      if (sum === value) {
        console.log(`Matched circle sum at (${row}, ${col}): ${sum}`);
      } else {
        console.log(
          `Mismatch circle sum at (${row}, ${col}): ${sum} (expected: ${value})`,
        );
      }
    }
  });
}

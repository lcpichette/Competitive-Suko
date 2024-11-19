import Board from "@/components/Board";
import Numpad from "@/components/Numpad";
import React from "react";

export default function BoardSpace() {
    const [selectedValue, setSelectedValue] = React.useState<number | undefined>(undefined);
    return (
        <div className={"h-[100vh] max-h-[100vh] box-border flex flex-col"}>
            <div className={"flex w-full justify-center items-center h-20 md:h-32"}>
                <h1 className={"text-3xl text-suko-900 font-semibold"}>Su/Ko</h1>
            </div>
            <div
                className={"mx-3 md:mx-10 flex flex-col md:flex-row gap-4 md:gap-20 items-center justify-end pb-16 h-full max-h-inherit"}>
                <div className={"w-full md:w-2/3 flex justify-center md:items-right md:justify-end self-center"}>
                    <Board selectedValue={selectedValue || 1}/>
                </div>
                <div className={"w-full md:w-1/3 flex md:items-left md:justify-start self-end"}>
                    <Numpad selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
                </div>
            </div>
        </div>
    );
}
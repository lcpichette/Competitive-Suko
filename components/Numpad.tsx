'use client'
import React, { useEffect } from "react";

interface Props {
    selectedValue: number;
    setSelectedValueAction: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Numpad({ selectedValue, setSelectedValueAction }: Props) {
    const [handPreference, setHandPreference] = React.useState<'Left' | 'Right'>('Right');
    const [numpadCollapsed, setNumpadCollapsed] = React.useState(false);
    useEffect(() => {
        const handleKeyDown = (event: unknown) => {
            if (typeof event === 'object' && event && 'key' in event && event.key) {
                if (typeof event.key === 'number' && event.key !== 0) {
                    const newValue: number = event.key;
                    setSelectedValueAction(newValue);
                } else if (typeof event.key === 'string') {
                    const newValue: number = parseInt(event.key);
                    setSelectedValueAction(newValue);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const coreButtonStyle = "h-14 w-14 flex justify-center items-center rounded-md ";
    const fullButtonStyle = `${coreButtonStyle} bg-suko-200/40 border border-suko-200/80`
    const numpadProps: NumpadProps = {
        fullButtonStyle,
        handPreference,
        setHandPreferenceAction: setHandPreference,
        numpadCollapsed,
        setNumpadCollapsedAction: setNumpadCollapsed,
        selectedValue,
        setSelectedValueAction
    }
    return (
        <div className={"block w-full"}>
            <div className={"flex justify-between items-end w-full"}>
                {handPreference === 'Right' &&
                    <RightHanded {...numpadProps} />
                }
                {handPreference === 'Left' &&
                    <LeftHanded {...numpadProps} />
                }
            </div>
        </div>
    );
}

const ring = (cellValue: number, selectedValue: number) => {
    if (cellValue == selectedValue) {
        return 'ring-2 ring-red-500 ring-offset-2'
    } else {
        return '';
    }
}

interface NumpadProps {
    fullButtonStyle: string,
    handPreference: string,
    setHandPreferenceAction: React.Dispatch<React.SetStateAction<"Left" | "Right">>,
    numpadCollapsed: boolean,
    setNumpadCollapsedAction: React.Dispatch<React.SetStateAction<boolean>>,
    selectedValue: number,
    setSelectedValueAction: React.Dispatch<React.SetStateAction<number | undefined>>
}

function RightHanded({fullButtonStyle, handPreference, setHandPreferenceAction, numpadCollapsed, setNumpadCollapsedAction, selectedValue, setSelectedValueAction }: NumpadProps) {
    return (
        <>
            <button className={`${fullButtonStyle}`} onClick={() => setHandPreferenceAction('Left')}>
                <svg className={"-rotate-12 size-6"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                </svg>
            </button>
            <div
                className={`md:w-1/3 flex md:items-left md:justify-start ${handPreference === 'Right' ? 'self-end' : 'self-start'}`}>
                {!numpadCollapsed &&
                    <div className={"grid gap-2 max-w-fit min-w-fit justify-center align-top grid-cols-3"}>
                        {[...Array(9).keys()].map((_, i) => (
                            <button onClick={() => setSelectedValueAction(i + 1)} type="button" key={i}
                                    className={`${fullButtonStyle} ${ring(i + 1, selectedValue)}`}>{i + 1}</button>
                        ))}
                    </div>
                }
                <button className={`${fullButtonStyle} self-end ml-2`}
                        onClick={() => setNumpadCollapsedAction(!numpadCollapsed)}>
                    {!numpadCollapsed
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
                        </svg>
                    }
                </button>
            </div>
        </>
    )
}

function LeftHanded({fullButtonStyle, handPreference, setHandPreferenceAction, numpadCollapsed, setNumpadCollapsedAction, selectedValue, setSelectedValueAction }: NumpadProps) {
    return (
        <>
            <div
                className={`md:w-1/3 flex md:items-left md:justify-start ${handPreference === 'Right' ? 'self-end' : 'self-start'}`}>
                <button className={`${fullButtonStyle} self-end mr-2`}
                        onClick={() => setNumpadCollapsedAction(!numpadCollapsed)}>
                    {!numpadCollapsed
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
                        </svg>
                    }
                </button>
                {!numpadCollapsed &&
                    <div className={"grid gap-2 max-w-fit min-w-fit justify-center align-top grid-cols-3"}>
                        {[...Array(9).keys()].map((_, i) => (
                            <button onClick={() => setSelectedValueAction(i + 1)} type="button" key={i}
                                    className={`${fullButtonStyle} ${ring(i + 1, selectedValue)}`}>{i + 1}</button>
                        ))}
                    </div>
                }
            </div>
            <button className={`${fullButtonStyle}`} onClick={() => setHandPreferenceAction('Right')}>
                <svg className={"rotate-12 size-6"} xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                </svg>
            </button>
        </>
    )
}
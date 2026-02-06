"use client";

import { forwardRef, DetailedHTMLProps, HTMLAttributes } from "react";


export interface CanvasProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {

};

export const Canvas = forwardRef<HTMLElement, CanvasProps>(
    (props, ref) => {
        return (
            <canvas {...props}>
                Canvas
            </canvas>
        );
    }
);

Canvas.displayName = "Canvas";

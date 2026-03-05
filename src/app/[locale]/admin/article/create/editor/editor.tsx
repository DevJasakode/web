"use client";
import {
    forwardRef,
    DetailedHTMLProps,
    HTMLAttributes,
    CSSProperties,
    useState,
    useCallback,
    useEffect,
} from "react";

export interface EditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> { }

const fontSize = 16;
const paddingY = 12;
const lineHeight = 1.2; // default browser kira-kira segini

const styles: CSSProperties = {
    border: "1px solid rgba(100,100,100,0.3)",
    borderRadius: 0,
    padding: paddingY,
    fontSize,
    lineHeight,
    minHeight: paddingY * 2 + fontSize * lineHeight,
    outline: "none",
};


interface Store {
    focus: boolean;
    value: string;
}

const initialStore: Store = {
    focus: false,
    value: "",
};


type BlinkingCursorProps = {
    width?: number;
    height?: number;
    color?: string;
    blinkDuration?: number; // dalam milidetik
};

const BlinkingCursor: React.FC<BlinkingCursorProps> = ({
    width = 2,
    height = 18,
    color = "black",
    blinkDuration = 1000,
}) => {
    const animationId = `blink-${Math.random().toString(36).slice(2)}`;

    return (
        <svg
            style={{
                display: "inline-block",
                verticalAlign: "middle", // atau "top"
            }}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <style>
                    {`
            @keyframes ${animationId} {
              0%, 49% { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
          `}
                </style>
            </defs>
            <rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill={color}
                style={{
                    animation: `${animationId} ${blinkDuration}ms step-end infinite`,
                }}
            />
        </svg>
    );
};

const Editor = forwardRef<HTMLElement, EditorProps>((props, ref) => {
    const [store, setStore] = useState<Store>(initialStore);

    const changeStore = useCallback(
        <K extends keyof Store>(name: K, value: Store[K]) => {
            setStore((prev) => ({ ...prev, [name]: value }));
        },
        []
    );


    const onKeyup = useCallback((ev: KeyboardEvent) => {
        switch (true) {
            case ev.key == "Shift":
                ev.preventDefault();
                ev.stopPropagation();
                break;
            case ev.key == "Backspace":
                ev.preventDefault();
                ev.stopPropagation();
                setStore(pre => ({ ...pre, value: pre.value.slice(0, pre.value.length - 1) }))
                break;
            case ev.key == " ":
                ev.preventDefault();
                ev.stopPropagation();
                setStore(pre => ({ ...pre, value: pre.value + " " }))
                break;
            case /^[A-Za-z0-9]+$/.test(ev.key): // test a-Z dan 0-9
                ev.preventDefault();
                ev.stopPropagation();
                setStore(pre => ({ ...pre, value: pre.value + ev.key }))
                break;
            default:
                console.log(ev.key);
                break;
        }
    }, []);

    const onRightClick = useCallback((ev: MouseEvent) => {
        ev.preventDefault(); // mencegah menu default browser
        // console.log("Klik kanan terdeteksi di:", ev.clientX, ev.clientY);
        const selection = window.getSelection();
        console.log(selection)

    }, []);





    // Hooks
    useEffect(() => {
        window.addEventListener("keyup", onKeyup);
        document.addEventListener("contextmenu", onRightClick);

        return () => {
            window.removeEventListener("keyup", onKeyup);
            document.removeEventListener("contextmenu", onRightClick);
        };
    }, []);

    return (
        <article
            {...props}
            ref={ref}
            tabIndex={0} // 🔑 INI KUNCI UTAMANYA
            style={{
                ...styles,
                borderColor: store.focus
                    ? "rgba(100,100,100,0.8)"
                    : "rgba(100,100,100,0.3)",

                whiteSpace: "pre"
            }}
            onFocus={() => changeStore("focus", true)}
            onBlur={() => changeStore("focus", false)}
        >
            {store.value}<BlinkingCursor />
        </article>
    );
});

Editor.displayName = "Editor";
export default Editor;

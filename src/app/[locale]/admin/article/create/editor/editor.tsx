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

    // Hooks
    useEffect(() => {
        window.addEventListener("keyup", onKeyup);
        return () => {
            window.removeEventListener("keyup", onKeyup);
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
            }}
            onFocus={() => changeStore("focus", true)}
            onBlur={() => changeStore("focus", false)}
        >
            {store.value}
        </article>
    );
});

Editor.displayName = "Editor";
export default Editor;

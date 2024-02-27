import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./text-editor.css"


const TextEditor: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState<string>("# Header");


    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return
            }
            setEditing(false)
        }
        document.addEventListener("click", listener, true)
        return () => {
            document.removeEventListener("click", listener, true)
        }
    }, []);

    if (editing) {
        return <div className="text-editor" ref={ref}>
            <MDEditor value={value} onChange={(val) => typeof val === "string" && setValue(val || "")} />
        </div>
    }


    return <div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
            <MDEditor.Markdown source={value} />

        </div>
    </div>
}


export default TextEditor;
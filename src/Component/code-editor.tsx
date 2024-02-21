import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { useRef } from "react";
import parser from 'prettier/parser-babel';
import prettier from "prettier"
import "bulmaswatch/superhero/bulmaswatch.min.css"
import "./code-editor.css"

interface CodeEditorProps {
    initialValue: string,
    onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>()
    const onEditorMount: EditorDidMount = (getValue, monacoEditor) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
        editorRef.current = monacoEditor;
    }

    const onFormatClick = () => {
        // get current value
        const unformattedValue = editorRef.current.getModel().getValue();

        // format value with prettier
        const formatted = prettier.format(unformattedValue, {
            parser: "babel",
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, "")

        // set the formatted value to the editor 
        editorRef.current.setValue(formatted)

    }


    return (
        <div className="editor-wrapper">
            <button
                className="button button-format is-primary is-small"
                onClick={onFormatClick}>Format</button>
            <MonacoEditor
                value={initialValue} // only a placeholder
                editorDidMount={onEditorMount}
                theme="dark"
                language="javascript"
                height={"100%"}
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,

                }}
            />
        </div>
    )

}

export default CodeEditor
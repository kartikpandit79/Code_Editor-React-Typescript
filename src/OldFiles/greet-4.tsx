import React, { useEffect, useRef, useState } from 'react'
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import CodeEditor from '../Component/code-editor';
import Preview from '../Component/preview';

const Greet = () => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("")
    const ref = useRef<any>();


    useEffect(() => {
        startService()
    }, []);


    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });
    }

    // *********** For Build ***************
    const onClickEvent = async () => {
        if (!ref.current) { return }

        let a = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': "'production'"
            }
        })
        setCode(a.outputFiles[0].text)
    }


    return (
        <div>
            <CodeEditor
                onChange={(value) => setInput(value)}
                initialValue='// Below is your next big idea Kartik' />
            <textarea rows={10} cols={81} value={input}
                onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <div>
                <button onClick={onClickEvent}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

export default Greet
import React, { useEffect, useRef, useState } from 'react'
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

const Greet = () => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("");
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
        // console.log("===", a);
        setCode(a.outputFiles[0].text)
    }
    // ********* For Transform ************
    // const onClickEvent = async () => {
    //     if (!ref.current) { return }
    //     let a = await ref.current.transform(input, {
    //         loader: "jsx",
    //         target: "es2015"
    //     })
    //     console.log("===", a);
    //     setCode(a.code)
    // }

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClickEvent}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    )
}

export default Greet
import React, { useEffect, useState } from 'react'
import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from "../bundler"
import Resizable from './resizeable';

const Greet = () => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("");
    const [err, setErr] = useState("")



    useEffect(() => {
        let timer = setTimeout(async () => {
            let a = await bundler(input)
            setCode(a.code)
            setErr(a.error)
            console.log("a", a);

        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [input])

    return (
        <Resizable direction='vertical'>
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        onChange={(value) => setInput(value)}
                        initialValue='// Below is your next big idea Kartik' />
                </Resizable>
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    )
}

export default Greet
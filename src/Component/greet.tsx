import React, { useState } from 'react'
import CodeEditor from './code-editor';
import Preview from './preview';
import bundler from "../bundler"
import Resizable from './resizeable';

const Greet = () => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("")

    // *********** For Build ***************
    const onClickEvent = async () => {

        let a = await bundler(input)
        setCode(a)
    }

    return (
        <Resizable direction='vertical'>
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        onChange={(value) => setInput(value)}
                        initialValue='// Below is your next big idea Kartik' />
                </Resizable>
                <Preview code={code} />
            </div>
        </Resizable>
    )
}

export default Greet
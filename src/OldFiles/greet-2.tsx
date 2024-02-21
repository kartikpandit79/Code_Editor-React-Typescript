import React, { useEffect, useRef, useState } from 'react'
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

const Greet = () => {
    const [input, setInput] = useState("")
    const [code, setCode] = useState("");
    const ref = useRef<any>();
    const iframeRef = useRef<any>();

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
        iframeRef.current.srcdoc = html;
        let a = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': "'production'"
            }
        })
        // setCode(a.outputFiles[0].text)
        iframeRef.current.contentWindow.postMessage(a.outputFiles[0].text, "*");
    }


    let html = `
    <html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
            console.log("iframe data")
            window.addEventListener("message", (e) =>{
                try{
                    eval(e.data)
                }catch(err){
                    const root = document.querySelector("#root");
                    root.innerHTML =   "<div style='color: red;'>"+err+"</div>"
                    
                }
            }, false)
        </script>
    </body>
   </html> 
    `

    return (
        <div>
            <textarea rows={10} cols={81} value={input}
                onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <div>
                <button onClick={onClickEvent}>Submit</button>
            </div>
            <pre>{code}</pre>
            <iframe ref={iframeRef} srcDoc={html} sandbox='allow-scripts' />
        </div>
    )
}

export default Greet
import { useEffect, useRef } from "react";
import "./preview.css"

interface PreviewProps {
    code: string,
    err: string
}



let html = `
<html>
<head>
<style> html {background-color: white}</style>
</head>
<body>
    <div id="root"></div>
    <script>
        const handleError = (err) =>{
            const root = document.querySelector("#root");
            root.innerHTML =   "<div style='color: red;'>"+err+"</div>"
            console.error(err)
            // throw err;
        }


        window.addEventListener("error", (e)=>{
            e.preventDefault();
            handleError(e.error)
        })

        window.addEventListener("message", (e) =>{
            try{
                eval(e.data)
            }catch(err){
                handleError(err)
            }
        }, false)
        console.log("iframe data")
    </script>
</body>
</html> 
`


const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        setTimeout(() => {
            iframeRef.current.contentWindow.postMessage(code, "*");
        }, 50)
    }, [code]);


    return (
        <div className="preview-wrapper">
            <iframe
                style={{ height: "100%", width: "100%", }}
                title="preview"
                ref={iframeRef}
                srcDoc={html}
                sandbox='allow-scripts' />
            {err && <div className="preview-error">{err}</div>}
        </div>
    )

}

export default Preview
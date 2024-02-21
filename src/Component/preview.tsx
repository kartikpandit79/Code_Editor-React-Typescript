import { useEffect, useRef } from "react";
import "./preview.css"

interface PreviewProps {
    code: string
}



let html = `
<html>
<head>
<style> html {background-color: white}</style>
</head>
<body>
    <div id="rooty"></div>
    <script>
        
        window.addEventListener("message", (e) =>{
            try{
                eval(e.data)
            }catch(err){
                const root = document.querySelector("#rooty");
                root.innerHTML =   "<div style='color: red;'>"+err+"</div>"
                throw err;
            }
        }, false)
        console.log("iframe data")
    </script>
</body>
</html> 
`


const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        iframeRef.current.contentWindow.postMessage(code, "*");
    }, [code]);


    return (
        <div className="preview-wrapper">
            <iframe
                style={{ height: "100%", width: "100%", }}
                title="preview"
                ref={iframeRef}
                srcDoc={html}
                sandbox='allow-scripts' />
        </div>
    )

}

export default Preview
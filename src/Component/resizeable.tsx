import { ResizableBox, ResizableBoxProps } from "react-resizable"
import "./resizable.css"
import { useEffect, useState } from "react";

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizeableProps: ResizableBoxProps;
    const [innerheightValue, setInnerHeight] = useState(window.innerHeight)
    const [innerWidthValue, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(Math.floor(window.innerWidth * .75))

    useEffect(() => {
        let timer: any
        const listner = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * .75 < width) {
                    setWidth(Math.floor(window.innerWidth * .75))
                }
            }, 100)
        }

        window.addEventListener('resize', listner)

        return () => {
            window.removeEventListener('resize', listner)
        }

    }, [width])

    if (direction === "vertical") {
        resizeableProps = {
            width: Infinity,
            height: 300,
            resizeHandles: ["s"],
            maxConstraints: [Infinity, Math.floor(innerheightValue * 0.81)],
            minConstraints: [Infinity, Math.floor(innerheightValue * 0.2)],
        }
    } else {
        resizeableProps = {
            className: "resize-horizontal",
            width: width,
            height: Infinity,
            resizeHandles: ["e"],
            maxConstraints: [Math.floor(innerWidthValue * 0.81), Infinity,],
            minConstraints: [Math.floor(innerWidthValue * 0.2), Infinity,],
            onResizeStop(e, data) {
                setWidth(data.size.width)
            },
        }
    }

    return <ResizableBox {...resizeableProps}

    >{children}</ResizableBox>
}

export default Resizable
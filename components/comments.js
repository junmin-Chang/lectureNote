import React, { useRef, useEffect } from 'react'

export default function Comment() {
    const commentRef = useRef();

    useEffect(() => {
       const scriptEl =  document.createElement("script")
        const utteranceConfig = {
            src: "https://utteranc.es/client.js",
            repo: "junmin-Chang/lectureNote",
            theme: "dark-blue",
            async: 'true',
            crossorigin: "anonymous",
            label: "✨💬 comments ✨",
            "issue-term": "pathname"
        }

        Object.entries(utteranceConfig).forEach(([key, value]) =>  {
            scriptEl.setAttribute(key, value)
        })
        commentRef.current.appendChild(scriptEl)
    },[])
    return (
        <div>
            <div ref={commentRef}>

            </div>
        </div>
    )
}
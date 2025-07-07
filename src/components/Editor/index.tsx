import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { LexicalEditor } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"

function Editor({ editorRef }: { editorRef: React.RefObject<LexicalEditor | null> }) {
    const [editor] = useLexicalComposerContext();
    useEffect(()=>{
        editorRef.current = editor;
    },[editor])

    return(
        <>
            <RichTextPlugin
                contentEditable={<ContentEditable className='textEditor'/>}
                placeholder={<div>Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
        </>
    )

}

export default Editor
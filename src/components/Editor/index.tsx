import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect, useImperativeHandle , forwardRef} from "react"

type EditorProps = {
    initialJson?: string;
};
export type EditorHandle = {
  getContent: () => string;
};

const Editor = forwardRef<EditorHandle, EditorProps>(({ initialJson }, ref) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if (!initialJson)
            return;
        const parsedState = editor.parseEditorState(initialJson);
        editor.setEditorState(parsedState);
    }, [editor, initialJson]);

    useImperativeHandle(ref, () => ({
        getContent() {
        let result = '';
        editor.getEditorState().read(() => {
            result = JSON.stringify(editor.getEditorState().toJSON());
        });
        return result;
        },
    }));

    return(
        <>
            <RichTextPlugin
                contentEditable={<ContentEditable className='textEditor'/>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
        </>
    )

});

export default Editor
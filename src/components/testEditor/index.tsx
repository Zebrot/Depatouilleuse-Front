import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import { useEffect, useState } from 'react';
const theme = {
    // Define your theme styles in there
};

const editorConfig = {
    namespace: 'MyEditor',
    theme,
    onError: () => {
        console.error('Oupsi');
    }
};


function TestEditor(){  
    const [editorState, setEditorState] = useState<EditorState | null>(null);

    function submitText() {
        console.log(JSON.stringify(editorState))
    }
    
    return(
        <div>
            <LexicalComposer initialConfig={editorConfig}>
                <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={<div>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <OnChangePlugin
                    onChange={(editorState: EditorState) => {
                        setEditorState(editorState);
                    }}
                />
            </LexicalComposer>
            <button onClick = {submitText}> Click here to submit ! </button>
        </div>
    );

}

export default TestEditor
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LexicalEditor } from 'lexical';
import Editor from '../Editor';
import {  useRef } from 'react'; 
import { useNavigate } from 'react-router';
import Toolbar from '../Toolbar';
import '../../style/css/editor.css'
const API_URL = import.meta.env.VITE_API_KEY;

const theme = {
    // Define your theme styles in there
};

const composerConfig = {
    namespace: 'MyEditor',
    theme,
    onError: () => {
        console.error('Oupsi');
    }
};


function Composer(){
    const editorRef = useRef<LexicalEditor | null>(null);
    const navigate = useNavigate();    

    const getContent = () => {
        const editor = editorRef.current;
        if (!editor) 
            return null;

        let content = '';
        editor.getEditorState().read(() => {
            content = JSON.stringify(editor.getEditorState().toJSON());
        });
        return content;
    };

    function submitText(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        e.preventDefault();
        let content = getContent();
        if (!content)
            return false;
        const data = {
            title : formData.get('title'),
            content : content,
            location : formData.get('location')
        }
        const headers = new Headers({'Content-Type': 'application/json'});
        fetch(API_URL, {
            method: 'POST',
            headers : headers,
            body:  JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => navigate(`/single?id=${data.id}`))
        .catch(error => console.log(error));


    }

    return(
        <div>
            <form onSubmit={submitText}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <LexicalComposer initialConfig={composerConfig}>
                    <Toolbar />
                    <Editor editorRef={editorRef}/>
                </LexicalComposer>

                <div>
                    <label htmlFor="location">location:</label>
                    <input type="text" id="location" name="location" required />
                </div>

                <button type="submit">Submit</button>
            </form>

        </div>
    );

}



export default Composer
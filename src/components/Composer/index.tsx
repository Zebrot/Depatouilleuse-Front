import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Editor, { EditorHandle } from '../Editor';
import { useRef } from 'react'; 
import { useNavigate } from 'react-router';
import Toolbar from '../Toolbar';
import '../../style/css/editor.css';
import LocationSelector from '../LocationSelector';
const API_URL = import.meta.env.VITE_API_KEY;

const theme = {
    // Define your theme styles in there
};
interface composerProps{
    initialContent?: string;
}
const composerConfig = {
    namespace: 'MyEditor',
    theme,
    onError: () => {
        console.error('Oupsi');
    }
};

function Composer({ initialContent} : composerProps){
    const editorRef = useRef<EditorHandle>(null);
    const navigate = useNavigate();
    if (initialContent)
        var parsedContent = JSON.parse(initialContent)

    function submitText(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        e.preventDefault();
        let content = editorRef.current?.getContent();
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
                    <Editor ref={editorRef} initialJson={parsedContent ? parsedContent : null}/>
                </LexicalComposer>

                <LocationSelector />
                <button type="submit">Submit</button>
            </form>

        </div>
    );

}



export default Composer
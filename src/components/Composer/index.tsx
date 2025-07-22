import { LexicalComposer } from '@lexical/react/LexicalComposer';
import Editor, { EditorHandle } from '../Editor';
import { useRef } from 'react'; 
import { useNavigate } from 'react-router';
import Toolbar from '../Toolbar';
import '../../style/css/composer.css';
import LocationSelector from '../LocationSelector';
import CleanDate from '../CleanDate';
import OverlayToolbar from '../OverlayToolbar';
const API_URL = import.meta.env.VITE_API_KEY;

const theme = {
    text: {
        bold: 'bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'strikethrough',
        highlight: 'highlight',
        xs: 'xs',
        s: 's',
        m: 'm',
        l: 'l',
        xl: 'xl'        
    }
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
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let content = editorRef.current?.getContent();
        if (!content)
            return false;
        const data = {
            title : formData.get('title'),
            content : content,
            location : formData.get('location'),
            date : new Date()
        }
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(data);
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
            <form onSubmit={submitText} className='blogForm'>
                <div className='blogForm__textEditor'>
                    <LexicalComposer initialConfig={composerConfig}>
                        <Toolbar />
                        <input className='blogForm__title' type="text" id="title" name="title" placeholder='Titre' required /> 
                        <Editor ref={editorRef} initialJson={parsedContent ? parsedContent : null}/>
                        <OverlayToolbar />

                    </LexicalComposer>
                </div>
                <LocationSelector />
                <CleanDate date = {new Date()} />
                <button className='blogForm__submitButton' type="submit">Submit</button>
            </form>
    );

}



export default Composer
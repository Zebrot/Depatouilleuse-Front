import '../../style/css/single.css';
import { useState,useEffect } from 'react';
import { useSearchParams,useNavigate } from 'react-router';

const API_URL = 'http://localhost:3000';
interface Blog {
    title: string;
    content: [string];
    location: string;
}


function Single() {
    const [blog, setBlog] = useState<Blog>();
    const [loadingError, setLoadingError] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = getIdFromURL();
    useEffect(() => {
        try {
        fetch(`${API_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                setLoadingError(true);
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(value => setBlog(value))
            .catch(error => console.log(error));
        }
        catch (error){
            console.log('attention ! ')
        }
    }, []);

    function handleDelete(){
        if(!window.confirm('Voulez vous vraiment supprimer ce blog ?'))
            return false

        const id = getIdFromURL();
        fetch(`${API_URL}/${id}`, {
            method : 'DELETE',
            headers : new Headers()
        })
        .then(() => navigate('/'))
        .catch(error => console.log(error))
    }
    
    function getIdFromURL() {
        const id = searchParams.get("id");
        return id;
    }
    
    if(loadingError)
        return(
    <p>
        On dirait bien que ce blog n'existe pas ! 
    </p>
    )

    if(!blog )
        return(<p> loading... </p>) 



    // Ici le vrai corps du blog : 

    return (
        <div className = 'blog'>
            <h1 className= 'blog__title'>{blog.title}</h1>
            <h2 className='blog__location'>{blog.location}</h2>
            <div className='blog__content'>{blog.content}</div>

        <button className='blog__deleteButton' onClick={handleDelete}> Supprimer ce blog</button>
        <button className='blog__modifyButton'> Modifier le blog </button>
        </div>
    )
}


export default Single
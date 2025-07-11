import Composer from '../../components/Composer';
import { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router';
const apiUrl = import.meta.env.VITE_API_KEY;

function Modify_Blog() {
    const [data, setData] = useState('')
    const blog_id = getIdFromURL();
    useEffect(() => { 
    fetch(`${apiUrl}/${blog_id}`)
            .then(response => response.json())
            .then(value => setData(value.content))
            .catch(error => console.log(error));
    }, []);
    if(data === '')
        return (<div>Loading...</div>)
    return (
        <Composer initialContent={data}/>
    );
}

function getIdFromURL() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    return id;
}


export default Modify_Blog;
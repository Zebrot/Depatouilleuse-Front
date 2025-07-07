import { useEffect, useState } from 'react';
import '../../style/css/home.css'
import { Link } from 'react-router';
const apiUrl = import.meta.env.VITE_API_KEY;

interface BlogPost {
    title: string;
    content: string;
    location: string;
    _id: string
}
  
function Home() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => { 
        fetch(apiUrl)
            .then(response => response.json())
            .then(value => setBlogPosts(value))
            .catch(error => console.log(error));
    }, []);
    
    if (blogPosts.length == 0) 
        return <p>Loading...</p>;
    return (
        <div className="homepage">
            {blogPosts.map((blog, i) => {
                return(
                    <div className='blog' key ={i}>
                        <Link to = {`/single?id=${blog._id}`}>
                            <h2 className='blog__title'>{blog.title}</h2>
                            <h3 className='blog__location'>{blog.location}</h3>
                        </Link>
                    </div>
                )
            })};
        </div>
    )
}

export default Home
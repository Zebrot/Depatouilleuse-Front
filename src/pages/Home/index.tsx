import { useEffect, useState } from 'react';
import '../../style/css/home.css'
import Card from '../../components/Card';
const API_URL = import.meta.env.VITE_API_KEY;

interface BlogPost {
    title: string;
    content: string;
    location: string;
    date: Date;
    _id: string;
}
function Home() {
    
    const [postsByLocation, setPostsByLocation] = useState<Record<string, BlogPost[]>>({});

    useEffect(()=> {
        fetch(API_URL)
            .then(res => res.json())
            .then(value => setPostsByLocation(value))
            .catch(error => console.log(error))
    },[])
    if(Object.entries(postsByLocation).length > 0){
        var blogList =  Object.entries(postsByLocation).map(([location, posts]) => (
            <div key={location} className='homepage__Location'>
                <h2>{location}</h2>
                <ul className='homepage__Location__Bloglist'>
                {posts.map((blog,i) => (
                    <Card large = {i===0 ? true : false} key = {blog._id} id = {blog._id} title= {blog.title} img_url={'yo'} date={blog.date} />
                ))}
                </ul>
            </div>
        ))
    }
    else
        return(
            <div>Loading...</div>
        )

    return (
        <div className="homepage">
            {blogList}
        </div>
    )
}

export default Home
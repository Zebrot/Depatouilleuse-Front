import { useEffect, useState } from "react";
var url = import.meta.env.VITE_API_KEY;
interface location{
    name : string
}
interface blog{
    title: string;
    content: string;
    location: string;
    _id : number;
}

function Test() {
    const [postsByLocation, setPostsByLocation] = useState<Record<string, blog[]>>({});

    useEffect(()=> {
        fetch(url)
            .then(res => res.json())
            .then(value => setPostsByLocation(value))
            .catch(error => console.log(error))
    },[])

    var blogList =  Object.entries(postsByLocation).map(([location, posts]) => (
    <div key={location}>
        <h2>{location}</h2>
        <ul>
        {posts.map((post) => (
            <li key = {post._id}>{post.title}</li>
        ))}
        </ul>
    </div>
    ))
    return (
        <div>
            {blogList}
        </div>
    )
}

export default Test;
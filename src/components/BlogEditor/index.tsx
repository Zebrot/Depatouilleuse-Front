import React from 'react';
import { useNavigate } from 'react-router';

const API_URL = 'http://localhost:3000';
function MyForm() {
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            title : formData.get('title'),
            content : formData.get('content'),
            location : formData.get('location')
        }

        const headers = new Headers ({
            'Content-Type': 'application/json'
        });
        fetch(API_URL, {
            method: 'POST',
            headers : headers,
            body:  JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => navigate(`/single?id=${data.id}`))
        .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
        </div>

        <div>
            <label htmlFor="content">Text:</label>
            <textarea id="content" name="content" rows={5} required></textarea>
        </div>

        <div>
            <label htmlFor="location">location:</label>
            <input type="text" id="location" name="location" required />
        </div>

        <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
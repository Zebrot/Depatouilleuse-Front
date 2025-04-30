import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_KEY;

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
      }, []);
    
        if (!data) 
            return <p>Loading...</p>;

        return (
            <div className="homepage">
                <p>
                    {data}
                </p>
                <div className="first-block">
                    <p>
                        Ici se trouve le premier bloc de texte, sympa non ?
                    </p>
                </div>
                <div className="second-block">
                    <p>
                        Ici se trouve le deuxième bloc de texte, sympa aussi
                    </p>
                </div>
            </div>
        )
}

export default Home
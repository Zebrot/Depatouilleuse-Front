import getResponse from '../../assets/scripts/utils.ts'
const apiUrl = import.meta.env.VITE_API_KEY;

function Home() {
    const blogs = getResponse(apiUrl);
    return (
        <div className="homepage">
            <p>
                {blogs}
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
import '../../style/css/card.css'
import { Link } from 'react-router'
import CleanDate from '../CleanDate';

interface cardProps {
    title : string,
    date  : Date,
    img_url : string;
    id : string;
    large? : boolean
};
const imgSrc = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftravelshelper.com%2Fwp-content%2Fuploads%2F2021%2F09%2FLaos-travel-guide-Travel-S-helper.jpg&f=1&nofb=1&ipt=710c7312a496e0433d364ef72cbfb9e59581e9a7e270ac2bcdf99d3f003e9ba8';

function Card({title, date, img_url, id, large } : cardProps){
    img_url = imgSrc;
    return (
        <Link to={`/single?id=${id}`} className={`${large? 'large' : '' } blogCard`}>
            <div className='blogCard__text'>
                <h2 className="blogCard__text__title">{title}</h2>
                <h2 className="blogCard__text__date"><i className='fa fa-calendar-o calendar_icon'></i><CleanDate date={date}/></h2>
            </div>
            <img className='blogCard__image' src={imgSrc}/>
        </Link>
    )
}

export default Card;
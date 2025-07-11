import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_KEY;

type location = {
    name : string
}

function LocationSelector(){
    const [locationList, setLocationList] = useState<location[]>([]);

    useEffect(()=> {
        fetch(`${API_URL}/location`)
            .then(res => res.json())
            .then(value => setLocationList(value))
            .catch(error => console.log(error));
    },[])

    const addLocation = function() {
        let promptValue = prompt('Nom du lieu :');
        fetch(`${API_URL}/location`, {
            method : 'POST',
            headers : new Headers({'Content-Type': 'application/json'}),
            body : JSON.stringify({'name' : promptValue})
        })
            .then(() => {
                if(!promptValue)
                    return 
                var newList = [...locationList, {name : promptValue}];
                setLocationList(newList)
            })
            .catch(error => console.log(error))

    }


    return (
        <div>
            <label htmlFor="location">location:</label>
            <select name="location" id="location">
                {locationList.map((location, i)=> {
                    return <option key = {i}>{location.name}</option>
                })}
            </select>
            <button onClick = {addLocation}><i className='fa fa-map-marker'></i>Ajouter un lieu</button>
        </div>

    )

}

export default LocationSelector
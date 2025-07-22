const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", 
    "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

type CleanDateProps = {
    date : Date
}
function CleanDate({date} : CleanDateProps) {
    date = new Date(date); // Dates get stringified when turned to JSON in the DB. 
    const dateString = `${days[date.getDay()]} ${date.getDate()}  ${months[date.getMonth()]} ${date.getFullYear()}`;
    return (
        <div>{dateString}</div>
    )
}

export default CleanDate;
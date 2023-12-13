import { Link } from "react-router-dom";
import ImageComponent from './ImageComponent';
import ApplicationRow from './ApplicationRow';

function Table({pets}) {
    // Check if pets is defined and not null
    if (!pets || pets.length === 0) {
        // Handle the case where pets is undefined or an empty array
        return <tbody>No applications available</tbody>;
    }
    return <table>
    <tbody>
        {pets.map(pet => (
            <ApplicationRow key={pet.petlisting} application={pet}/>
        ))}
    </tbody>
    </table>;
}
//<td><Link to={`/teams/${player.team.id}`}>{player.team.name}</Link></td>
export default Table;
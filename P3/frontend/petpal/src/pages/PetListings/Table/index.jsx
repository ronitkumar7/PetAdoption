import { Link } from "react-router-dom";
import ImageComponent from './ImageComponent';
import PetInfo from './PetInfo';

function Table({pets}) {
    return <table>
    <tbody>
        {pets.map(pet => (
            <tr key={pet.id}>
                <td style={{ width: '300px', height: '200px' }}>
                    <ImageComponent imageUrl={pet.avatar} />
                </td>
                <td> <PetInfo pet={pet}/> </td>
            </tr>
        ))}
    </tbody>
    </table>;
}
//<td><Link to={`/teams/${player.team.id}`}>{player.team.name}</Link></td>
export default Table;
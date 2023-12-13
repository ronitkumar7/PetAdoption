import { Link } from "react-router-dom";
import ImageComponent from './ImageComponent';
import PetInfo from './PetInfo';
import { useState, useEffect } from "react";

function Table({pets}) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [screenWidth]); 
    if (!pets || pets.length === 0) {
        // Handle the case where pets is undefined or an empty array
        return <tbody>No pets available</tbody>;
    }
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
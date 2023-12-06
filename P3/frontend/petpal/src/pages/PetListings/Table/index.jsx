import { Link } from "react-router-dom";

function Table({players}) {
    return <table>
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Height</th>
            <th>Team</th>
        </tr>
    </thead>
    <tbody>
        {players.map(player => (
            <tr key={player.id}>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>{player.position}</td>
                <td>{ 
                    player.height_feet
                    ? `${player.height_feet}' ${player.height_inches}"`
                    : ''
                }</td>
                <td><Link to={`/teams/${player.team.id}`}>{player.team.name}</Link></td>
            </tr>
        ))}
    </tbody>
    </table>;
}

export default Table;
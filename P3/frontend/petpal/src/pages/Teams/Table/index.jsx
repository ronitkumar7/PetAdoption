import { Link } from "react-router-dom";

function Table({teams}) {
    return <table>
    <thead>
        <tr>
            <th>Abbreviation</th>
            <th>Name</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        {teams.map(team => (
            <tr key={team.id}>
                <td><Link to={`./${team.id}`}>{team.abbreviation}</Link></td>
                <td>{team.name}</td>
                <td>{team.city}</td>
            </tr>
        ))}
    </tbody>
    </table>;
}

export default Table;
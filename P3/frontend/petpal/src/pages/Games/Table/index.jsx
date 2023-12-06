function Table({games}) {
    return <table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Score</th>
            <th>Away Team</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
        {games.map(game => (
            <tr key={game.id}>
                <td>{(new Date(game.date)).toLocaleDateString()}</td>
                <td>{game.home_team.full_name}</td>
                <td>{game.period === 4 ? game.home_team_score : 'N/A'}</td>
                <td>{game.visitor_team.full_name}</td>
                <td>{game.period === 4 ? game.visitor_team_score : 'N/A'}</td>
            </tr>
        ))}
    </tbody>
    </table>;
}

export default Table;
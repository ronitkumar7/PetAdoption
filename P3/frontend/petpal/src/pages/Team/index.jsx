import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Team() {
    let navigate = useNavigate();
    const [ team, setTeam ] = useState({});
    const { teamID } = useParams();

    useEffect(() => {
        fetch(`https://www.balldontlie.io/api/v1/teams/${teamID}`)
        .then(response => response.json())
        .then(json => {
            setTeam(json);
        });
    }, [ teamID ]);

    return <> 
        <h1>Team Detail</h1>
        <dl>
            <dt>Name:</dt><dd>{team?.name}</dd>
            <dt>City:</dt><dd>{team?.city}</dd>
            <dt>Abbreviation:</dt><dd>{team?.abbreviation}</dd>
        </dl>
        <button onClick={() => navigate("/teams")}>Back to Teams</button>
    </>;
}

export default Team;
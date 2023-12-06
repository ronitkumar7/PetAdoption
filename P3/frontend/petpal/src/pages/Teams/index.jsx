import { useState, useEffect } from "react";
import Table from "./Table";
import { useContext } from "react";
import { APIContext } from "../../contexts/APIContext";

function Teams() {
    const [query, setQuery] = useState({page: 1});
    const [totalPages, setTotalPages] = useState(1);
    const [ teams, setTeams ] = useState([]);
    const { setPage } = useContext(APIContext);

    useEffect(() => {
        const { page } = query;
        fetch(`https://www.balldontlie.io/api/v1/teams?per_page=20&page=${page}`)
        .then(response => response.json())
        .then(json => {
            setTeams(json.data);
            setTotalPages(json.meta.total_pages);
        });
    }, [query]);

    return <> 
        <h1>List of Teams</h1>
        <Table teams={teams} />
        <p>
        { query.page < totalPages
          ? <button onClick={() => setQuery({...query, page: query.page + 1})}>Next</button>
          : <></> }
        { query.page > 1 
          ? <button onClick={() => setQuery({...query, page: query.page - 1})}>Previous</button>
          : <></> }
        </p>
        <p>Page {query.page} out of {totalPages}.</p>
    </>;
}

export default Teams;
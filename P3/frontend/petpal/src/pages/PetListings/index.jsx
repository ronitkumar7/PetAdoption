import { useState, useEffect } from "react";
import Table from "./Table";

function Players() {
    const [query, setQuery] = useState({search: "", page: 1});
    const [totalPages, setTotalPages] = useState(1);
    const [ players, setPlayers ] = useState([]);

    useEffect(() => {
        const {search, page} = query;
        fetch(`https://www.balldontlie.io/api/v1/players?search=${search}&page=${page}`)
        .then(response => response.json())
        .then(json => {
            setPlayers(json.data);
            setTotalPages(json.meta.total_pages);
        });
    }, [query]);

    return <>
        <p>
            <label>Search Player Name: 
                <input 
                    value={query.search} 
                    onChange={event => setQuery({search: event.target.value, page: 1})} 
                />
            </label>
        </p>  
        <Table players={players} />
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

export default Players;